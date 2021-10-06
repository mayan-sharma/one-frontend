import Link from 'next/link';
import Head from 'next/head';

import { getPublicProfile } from '../../actions/auth';
import Layout from '../../components/Layout';
import { API, DOMAIN } from '../../config';

const ProfileIndexPage = ({ user, blogs, query }) => {

    const head = () => (
        user && (
            <Head>
                <title>{user.username} | one</title>
                <meta name='description' content={`Blogs by ${user.username}`} />

                <link rel='canonical' href={`${DOMAIN}/profile/${query.username}`} />
                <meta propery='og:title' content={`${user.username} | one`} />
                <meta property='og:description' content={`Blogs by ${user.username}`} />

                <meta property='og:type' content='website' />
                <meta property='og:url' content={`${DOMAIN}/profile/${query.username}`} />
                <meta property='og:site_name' content='one' />

                <meta property='og:image' content={`${DOMAIN}/public/static/images/blog-image.png`} />
                <meta property='og:image:secure_url' content={`${DOMAIN}/public/static/images/blog-image.png`} />
                <meta property='og:image:type' content='image/png' />
            </Head>
        )
    );

    const showUserBlogs = () => (
        blogs && blogs.map(blog => (
            <div key={blog.id} className='mt-4 mb-4'>
                <Link href={`/blogs/${blog.slug}`}>
                    <a className='lead'>{blog.title}</a>
                </Link>
            </div>
        ))
    );

    return (
        user && (
            <>
                <Layout>
                    {head()}
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <h5>{user.username}</h5>
                                                <p className='text-muted'>Total blogs posted - {blogs.length}</p>
                                            </div>
                                            <div className='col-md-4'>
                                                <img
                                                    src={`${API}/auth/photo/${user.username}`}
                                                    className='img img-fluid img-thumbnail mb-3'
                                                    style={{ maxHeight: '100px', maxWidth: '100%' }}
                                                    alt='profile photo'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='container pb-5'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title bg-primary pt-2 pb-2 pl-2 pr-2 text-light'>Recent blogs by{user.name}</h5>
                                        {showUserBlogs()}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h5 className='card-title bg-primary pt-2 pb-2 pl-2 pr-2 text-light'>Message {user.name}</h5>
                                        <p>...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        )
    );
}

ProfileIndexPage.getInitialProps = async ({ query }) => {
    try {
        const res = await getPublicProfile(query.username);
        if (res.status === 200) {
            return {
                user: res.data.user,
                blogs: res.data.blogs,
                query
            }
        }

    } catch (err) {
        console.log(err);
    }

    return {};
}

export default ProfileIndexPage;