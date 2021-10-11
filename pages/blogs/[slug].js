import renderHTML from 'react-render-html'
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

import Layout from '../../components/Layout';
import MiniCard from '../../components/blog/MiniCard';
import DisqusThread from '../../components/DisqusThread';
import { getBlog, getRelatedBlog } from '../../actions/blog';
import { API, DOMAIN } from '../../config';

const SingleBlogPage = ({ blog, query }) => {

    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        loadRelatedBlogs();
    }, []);

    const loadRelatedBlogs = async () => {
        try {
            const res = await getRelatedBlog(blog.slug, 3);
            if (res.status === 200) {
                setRelatedBlogs(res.data.blogs);
            } else console.log(res);

        } catch (err) {
            console.log(err);
        }
    }

    const head = () => (
        <Head>
            <title>{blog.title} | one</title>
            <meta name='description' content={blog.metaDesc} />

            <link rel='canonical' href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta propery='og:title' content={`${blog.title} | one`} />
            <meta property='og:description' content={blog.metaDesc} />

            <meta property='og:type' content='website' />
            <meta property='og:url' content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property='og:site_name' content='one' />

            <meta property='og:image' content={`${API}/blogs/photo/${blog.photo}`} />
            <meta property='og:image:secure_url' content={`${API}/blogs/photo/${blog.photo}`} />
            <meta property='og:image:type' content='image/png' />
        </Head>
    )

    const showCategories = () => (
        blog.Categories.map(category => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mr-2 ml-1'>{category.name}</a>
            </Link>
        ))
    )

    const showTags = () => (
        blog.Tags.map(tag => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-2 ml-1'>{tag.name}</a>
            </Link>
        ))
    )

    const showRelatedBlogs = () => (
        relatedBlogs.map(blog => (
            <div key={blog.id} className='col-md-4'>
                <article>
                    <MiniCard blog={blog} />
                </article>
            </div>
        ))
    )

    const showComments = () => (
        <div>
            <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
        </div>
    )

    return (
        <>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className='container-fluid'>
                            <section>
                                <div className='row' style={{marginTop: '-30px'}}>
                                    <img 
                                        src={`${API}/blogs/photo/${blog.slug}`} 
                                        alt={blog.title}
                                        className='img img-fluid'
                                        style={{maxHeight: '700px', width: '100%', objectFit: 'cover'}}
                                    />
                                </div>
                            </section>
                            <section>
                                <div className='text-center'>
                                    <h1 className='display-4 pb-3 pt-3font-weight-bold '>{blog.title}</h1>
                                    <p className='lead mt-3'>
                                        Written By {blog.User.username}
                                    </p>
                                    <div className='pb-3'>
                                        {showCategories()}
                                        {showTags()}
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='container'>
                            <section>
                                <div className='col-md-12 lead'>
                                    {renderHTML(blog.body)}
                                </div>
                            </section>
                        </div>
                        <div className='container'>
                            <h4 className='text-center pt-5 pb-5 h2'>Related Blogs</h4>
                            <hr/>
                            <div className='row'>
                                {showRelatedBlogs()}
                            </div>
                        </div> 
                        <div className='container pt-5 pb-5'>
                            {showComments()}
                        </div>
                    </article>
                </main>
            </Layout>        
        </>
    );
}

SingleBlogPage.getInitialProps = async ({ query }) => {
    try {
        const res = await getBlog(query.slug);
        if (res.status === 200) {
            return {
                blog: res.data.blog,
                query 
            }
        }
        else return {};

    } catch (err) {
        console.log(err);
        return {};
    }
}

export default SingleBlogPage;