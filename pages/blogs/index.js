import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import Layout from '../../components/Layout';
import { getAllBlogsWithCategoriesAndTags } from '../../actions/blog';
import axios from 'axios';

const BlogPage = ({ blogs, categories, tags, size }) => {

    const showAllBlogs = () => (
        blogs.map(blog => (
            <article key={blog.id}>
                <div className='lead pb-4'>
                    <header>
                        <Link href={`blogs/${blog.slug}`}>
                            <a>
                                <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
                            </a>
                        </Link>
                    </header>
                    <section>
                        <p className='mark ml-1 pt-2 pb-2'> 
                            Written By {blog.User.name} | Published
                        </p>
                    </section>
                    <section>
                        <p>...</p>
                    </section>
                    <div className='row'>
                        <div className='col-md-4'>
                            ...
                        </div>
                        <div className='col-md-8'>
                            <section>
                                <div className='pb-3'>
                                    { blog.excerpt }
                                </div>
                                <Link href={`/blogs/${blog.slug}`}>
                                    <a className='btn btn-primary pt-2'>Read More</a>
                                </Link>
                            </section>
                        </div>
                    </div>
                </div>
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