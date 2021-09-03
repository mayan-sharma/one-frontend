import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

const AdminIndexPage = () => {
    return (
        <Layout>
            <Admin>
                <p>Admin Dashboard</p>
            </Admin>
        </Layout>
    );
}

export default AdminIndexPage;