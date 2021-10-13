import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import jwt from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import { registerUser } from '../../../actions/auth';

const ActivateAccountPage = ({ router }) => {
    
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        success: '',
        loading: false
    });

    const { name, token, error, success, loading } = values;

    useEffect(() => {
        let token = router.query.token;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({...values, name, token});
        }

    }, [router]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setValues({...values, loading: true});
            const res = await registerUser(token);
            if (res.status === 200) {
                setValues({
                    ...values,
                    error: '',
                    success: res.data.message,
                    loading: false
                });
            
            } else {
                setValues({
                    ...values,
                    error: res.data.message,
                    success: '',
                    loading: false
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

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
            <div className='container text-center'>
                <h3 className='pb-4'>Hello {name}, Click on the button to activate you account.</h3>
                {showError()}
                {showSuccess()}
                <button disabled={loading} onClick={handleSubmit} className='btn btn-outline-primary'>Activate Account</button>
            </div>
        </Layout>
    );
}

export default withRouter(ActivateAccountPage);