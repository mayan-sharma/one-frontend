import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState } from 'react';

import Layout from '../../components/Layout';
import { getAllBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import { DOMAIN } from '../../config';

const BlogPage = ({ blogs, categories, tags, limit, blogsSkip, blogsSize, router }) => {

    const [skip, setSkip] = useState(blogsSkip);
    const [size, setSize] = useState(blogsSize);
    const [loading, setLoading] = useState(false);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const head = () => (
        <Head>
            <title>Tech Blogs | one</title>
            <meta name='description' content='Tech Blogs' />

            <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
            <meta propery='og:title' content={'Latest web development tutorials | one'} />
            <meta property='og:description' content='Tech blogs' />

            <meta property='og:type' content='website' />
            <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
            <meta property='og:site_name' content='one' />

            <meta property='og:image' content={`${DOMAIN}/public/static/images/blog-image.png`} />
            <meta property='og:image:secure_url' content={`${DOMAIN}/public/static/images/blog-image.png`} />
            <meta property='og:image:type' content='image/png' />
        </Head>
    )

    const loadMore = async () => {
        let toSkip = skip + limit;
        setLoading(true);
        try {
            const res = await getAllBlogsWithCategoriesAndTags(limit, toSkip);
            if (res.status === 200) {
                setLoadedBlogs([...loadedBlogs, ...res.data.blogs]);
                setSkip(toSkip);
                setSize(res.data.blogs.length);
                
            } else {
                console.log(res);
            }
            
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    const showLoadMoreButton = () => (
        size && size >= limit && (
            <button disabled={loading} onClick={loadMore} className='btn btn-outline-primary btn-lg'>
                Load More
            </button>
        )
    );

    const showAllBlogs = () => (
        blogs.map(blog => (
            <article key={blog.id}>
                <Card blog={blog} />
                <hr />
            </article>
        ))
    );

    const showLoadedBlogs = () => (
        loadedBlogs.map(blog => (
            <article key={blog.id}>
                <Card blog={blog} />
                <hr />
            </article>
        ))
    );

    const showAllCategories = () => (
        categories.map(category => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
                <a className='btn btn-primary mr-1 ml-1 mt-3'>
                    {category.name}
                </a>
            </Link>
        ))
    );

    const showAllTags = () => (
        tags.map(tag => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>
                    {tag.name}
                </a>
            </Link>
        ))
    );

    return (
        <>
            {head()}
            <Layout>
                <main>
                    <div className='container-fluid'>
                        <header>
                            <div className='col-md-12 pt-3'>
                                <h1 className='display-4 font-weight-bold text-center'>Tech Blogs</h1>
                            </div>
                            <section className='text-center'>
                                {showAllCategories()}
                                {showAllTags()}
                            </section>
                        </header>
                    </div>
                    <div className='container-fluid'>{showAllBlogs()}</div>
                    <div className='container-fluid'>{showLoadedBlogs()}</div>
                    <div className='text-center pt-5 pb-5'>{showLoadMoreButton()}</div>
                </main>
            </Layout>
        </>
    );
}

// for server side rendering
BlogPage.getInitialProps = async () => {
    try {
        let limit = 2;
        let skip = 0;
        const res = await getAllBlogsWithCategoriesAndTags(limit, skip);
        if (res.status === 200) {
            return {
                blogs: res.data.blogs,
                categories: res.data.categories,
                tags: res.data.tags,
                blogsSkip: skip,
                size: res.data.size,
                limit,
            }

        } else return {};

    } catch (err) {
        console.log(err);
        return {};
    }
}

export default withRouter(BlogPage);