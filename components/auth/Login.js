import { useState, useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

import useForm from '../../lib/useForm';
import LoginGoogle from './LoginGoogle';
import { loginUser, storeAuthInfo, isAuth } from '../../actions/auth';

const Login = () => {

    const { inputs, handleChange, clearForm } = useForm({
        email: '',
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
                password: inputs.password
            };

            const res = await loginUser(user);

            if (res.status === 200) {
                setMessage(res.data.message);
                console.log(isAuth());
                storeAuthInfo(res.data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin');
                    } else {
                        Router.push('/user');
                    }
                });

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
            <LoginGoogle />
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
                <button disabled={loading} className='btn btn-primary'>Login</button>
            </div>
            <div className='mt-3 mb-3'>
                <Link href={'/auth/password/forgot'}>
                    <a>Forgot Password</a>
                </Link>
            </div>
            {showLoading()}
            {showError()}
            {showMessage()}
        </form>
    );
}

export default Login;