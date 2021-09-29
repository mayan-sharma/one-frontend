import Head from 'next/head';

import Layout from '../../components/Layout';
import Card from '../../components/blog/Card';
import { getCategory } from '../../actions/category';
import { DOMAIN } from '../../config';

const SingleCategoryPage = ({ category, query, blogs }) => {
    
    const showBlogs = () => (
        blogs.map(blog => (
            <div>
                <Card key={blog.id} blog={blog} />
                <hr/>
            </div>
        ))
    )

    const head = () => (
        <Head>
            <title>{category.name} | one</title>
            <meta name='description' content={`Blogs on ${category.name}`} />

            <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
            <meta propery='og:title' content={`${category.name} | one`} />
            <meta property='og:description' content={`Blogs on ${category.name}`} />

            <meta property='og:type' content='website' />
            <meta property='og:url' content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property='og:site_name' content='one' />

            <meta property='og:image' content={`${DOMAIN}/public/static/images/blog-image.jpg`} />
            <meta property='og:image:secure_url' content={`${DOMAIN}/public/static/images/blog-image.jpg`} />
            <meta property='og:image:type' content='image/jpg' /> 
        </Head>
    )
    
    return (
        <> 
            {head()}
            <Layout>
                <main>
                    <div className='container-fluid'>
                        <header>
                            <div className='col-md-12 pt-3'>
                                <h1 className='font-weight-bold text-center'>{category?.name}</h1>
                                {showBlogs()}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </>
    );
}

SingleCategoryPage.getInitialProps = async ({ query }) => {
    try {
        const res = await getCategory(query.slug);
        if (res.status === 200) {
            return {
                category: res.data.category,
                blogs: res.data.blogs,
                query
            }
        }

    } catch (err) {
        console.log(err);
    }

    return {};
}

export default SingleCategoryPage;