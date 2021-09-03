import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';

const UserIndexPage = () => {
    return (
        <Layout>
            <Private>
                <p>User Dashboard</p>
            </Private>
        </Layout>
    );
}

export default UserIndexPage;