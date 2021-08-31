import Layout from '../components/Layout';

import Login from '../components/auth/Login';

const LoginPage = () => {
    return (
        <Layout>
            <h2 className='text-center'>Login</h2>
            <div className='row'>
                <div className='col-md-4 offset-md-4 mt-4'>
                    <Login />
                </div>
            </div>
        </Layout>
    );
}

export default LoginPage;