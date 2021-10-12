import { useState } from 'react';
import Layout from '../../../components/Layout';
import { forgotPassword } from '../../../actions/auth';

const ForgetPasswordPage = () => {
    
    const [values, setValues] = useState({
        email: '',
        success: '',
        error: '',
        loading: false
    });
    
    const { email, success, error, loading } = values;

    const handleChange = e => {
        setValues({
            ...values,
            email: e.target.value,
            success: '',
            error: ''
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setValues({...values, loading: true});
            const res = await forgotPassword(email);
            if (res.status === 200) {
                setValues({
                    ...values,
                    email: '',
                    success: res.data.message,
                    error: '',
                    loading: false
                });

            } else {
                setValues({
                    ...values,
                    email: '',
                    success: '',
                    error: res.data.message,
                    loading: false
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

    const showResetForm = () => (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input 
                        type='email'
                        onChange={handleChange}
                        value={email}
                        className='form-control'
                        placeholder='Type your email here'
                        required
                    />
                </div>
                <div>
                    <button disabled={loading} className='btn btn-primary'>Send Reset Link</button>
                </div>
            </form>
        </div>
    )

    const showError = () => (
        error && (
            <div className='alert alert-danger'>
                {error}
            </div>
        )
    )

    const showSuccess = () => (
        success && (
            <div className='alert alert-success'>
                {success}
            </div>
        )
    )

    return (
        <Layout>
            <div className='container'>
                <h2>Forgot Password</h2>
                <hr/>
                {showSuccess()}
                {showError()}
                {showResetForm()}
            </div>
        </Layout>
    );
}

export default ForgetPasswordPage;