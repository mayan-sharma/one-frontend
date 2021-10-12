import { useState } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../../../components/Layout';
import { resetPassword } from '../../../../actions/auth';

const PasswordResetPage = ({ router }) => {
    
    const [values, setValues] = useState({
        password: '',
        success: '',
        error: '',
        loading: false
    });

    const { password, success, error, loading } = values;
    const token = router.query.token;

    const handleChange = e => {
        setValues({
            ...values,
            password: e.target.value,
            success: '',
            error: ''
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setValues({ ...values, laoding: true });
            const res = await resetPassword(password, token);
            if (res.status === 200) {
                setValues({
                    ...values,
                    password: '',
                    error: '',
                    success: res.data.message,
                    loading: false
                });
            
            } else {
                setValues({
                    ...values,
                    password: '',
                    error: res.data.message,
                    success: '',
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
                        type='password'
                        onChange={handleChange}
                        value={password}
                        className='form-control'
                        placeholder='Type your new password here'
                        required
                    />
                </div>
                <div>
                    <button disabled={loading} className='btn btn-primary'>Reset Password</button>
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
                <h2>Reset Password</h2>
                <hr/>
                {showSuccess()}
                {showError()}
                {showResetForm()}
            </div>
        </Layout>
    );
}

export default withRouter(PasswordResetPage);