import Link from 'next/link';

import Layout from '../components/Layout';

const IndexPage = () => {
    return (
        <Layout>
            <div className='container text-center'>
                <h1>Welcome to One</h1>
                <h3>A place to share ideas.</h3>
                <Link href='/blogs'>
                    <a className='btn btn-primary mt-2'>Explore</a>
                </Link>
            </div>
        </Layout>
    );
}

export default IndexPage;