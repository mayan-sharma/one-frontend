import Head from 'next/head';
import { useState } from 'react';

import Layout from '../../components/Layout';
import { getAllBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';

const BlogPage = ({ blogs, categories, tags, size }) => {

    const showAllBlogs = () => (
        blogs.map(blog => (
            <article key={blog.id}>
                <Card blog={blog} />
                <hr/>
            </article>
        ))
    );

    return (
        <Layout>
            <main>
                <div className='container-fluid'>
                    <header>
                        <div className='col-md-12 pt-3'>
                            <h1 className='display-4 font-weight-bold text-center'>Tech Blogs</h1>
                        </div>
                        <section>
                            <p>...</p>
                        </section>
                    </header>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>{showAllBlogs()}</div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

// for server side rendering
BlogPage.getInitialProps = async () => {
    try {
        const res = await getAllBlogsWithCategoriesAndTags();
        if (res.status === 200) {
            return res.data;

        } else return {};
    
    } catch (err) {
        console.log(err);
        return {};
    }
}

export default BlogPage;