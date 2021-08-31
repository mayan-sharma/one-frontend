import Layout from '../components/Layout';

import Register from '../components/auth/Register';

const RegisterPage = () => {
    return (
        <Layout>
            <h2 className='text-center'>Register</h2>
            <div className='row'>
                <div className='col-md-4 offset-md-4 mt-4'>
                    <Register />
                </div>
            </div>
        </Layout>
    );
}

export default RegisterPage;