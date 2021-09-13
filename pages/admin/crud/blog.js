import Link from 'next/link';

import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import Blog from '../../../components/crud/Blog';

const BlogPage = () => {
    return (
        <Layout>
            <Admin>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12 pt-5 pb-5'>
                            <h2>Create a new blog</h2>
                        </div>
                        <div className='col-md-12'>
                            <Blog />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
}

export default BlogPage;