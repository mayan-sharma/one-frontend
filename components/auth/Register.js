import { useEffect, useState } from 'react';
import Router from 'next/router';

import useForm from '../../lib/useForm';
import { isAuth, registerUser } from '../../actions/auth';

const Register = () => {
    
    const { inputs, handleChange, clearForm } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        isAuth() && Router.push('/');
    }, []);

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            
            setLoading(true);
            setError(null);
    
            const user = {
                email: inputs.email,
                name: inputs.name,
                password: inputs.password
            };

            const res = await registerUser(user);
            
            if (res.status) {
                setMessage(res.data.message);
            } else {
                setError(res.data.message);
            }

            setLoading(false);
            clearForm();

        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const showLoading = () => loading ? <div className='alert alert-info'>Loading...</div> : '';
    const showError = () => error ? <div className='alert alert-danger'>{error}</div> : '';
    const showMessage = () => message ? <div className='alert alert-info'>{message}</div> : '';

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input 
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Enter your name'
                    onChange={handleChange}
                    value={inputs.name}
                />
            </div>
            <div className='form-group'>
                <input 
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    value={inputs.email}
                />
            </div>
            <div className='form-group'>
                <input 
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    value={inputs.password}
                />
            </div>
            <div className='mt-3 mb-3'>
                <button disabled={loading} className='btn btn-primary'>Register</button>
            </div>
            {showLoading()}
            {showError()}
            {showMessage()}
        </form>
    );
}

export default Register;