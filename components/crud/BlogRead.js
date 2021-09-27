import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router'; 

import { getCookie, isAuth } from '../../actions/auth';
import { getAllBlogs, removeBlog } from '../../actions/blog';

const BlogRead = () => {
    
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const res = await getAllBlogs();
            if (res.status === 200) {
                setBlogs(res.data.blogs);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async slug => {
        try {
            const res = await removeBlog(slug, token);
            if (res.status === 200) {
                setMessage('Blog deleted!');
                loadBlogs();
            }

        } catch (err) {
            console.log(err);
        }
    }

    const showUpdateButton = (blog) => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className='ml-2 btn btn-sm btn-warning'>Update</a>
                </Link>
            ) 
        } else {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className='ml-2 btn btn-sm btn-warning'>Update</a>
                </Link>
            )
        }
    }

    const showBlogs = () => (
        blogs.map(blog => (
            <div key={blog.id}>
                <h3>{blog.title}</h3>
                <p>Written By {blog.User.name}</p>
                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(blog.slug)}>Delete</button>
                {showUpdateButton(blog)}
                <hr/>
            </div>
        )) 
    )
    
    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    {message && <div className='alert alert-warning'>{message}</div>}
                    {showBlogs()}
                </div>
            </div>
        </>
    );
}

export default BlogRead;