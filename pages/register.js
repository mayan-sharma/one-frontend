import Layout from '../components/Layout';
import { withRouter } from 'next/router';
import Register from '../components/auth/Register';

const RegisterPage = ({ router }) => {
    
    const showRedirectMessage = () => (
        router.query.message && (
            <div className='alert alert-danger'>
                {router.query.message}
            </div>
        )
    );
    
    return (
        <Layout>
            <h2 className='text-center'>Register</h2>
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                    {showRedirectMessage()}
                </div>
            </div>  
            <div className='row'>
                <div className='col-md-4 offset-md-4 mt-4'>
                    <Register />
                </div>
            </div>
        </Layout>
    );
}

export default withRouter(RegisterPage);