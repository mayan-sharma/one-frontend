import Link from 'next/link';
import { useState, useEffect } from "react";

import { searchBlogs } from '../../actions/blog';

const Search = () => {

    const [values, setValues] = useState({
        search: null,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;
    console.log(search);
    const handleChange = e => {
        setValues({
            ...values,
            search: e.target.value,
            searched: false,
            results: []
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await searchBlogs(search);
            if (res.status === 200) {
                setValues({
                    ...values,
                    results: res.data.blogs,
                    searched: true,
                    message: `${res.data.blogs.length} blogs found`
                });

            } else {
                setValues({
                    message: 'No blogs found'
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

    const showSearchedBlogs = () => (
        <div className='jumbotron bg-white'>
            {message && <p className='pt-4 text-muted font-italic'>{message}</p>}
            {results.map(blog => (
                <div key={blog.id} className=''>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className='text-primary'>{blog.title}</a>
                    </Link>
                </div>
            ))}
        </div>
    )

    const showSearchForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-md-8'>
                    <input 
                        type='search' 
                        className='form-control' 
                        placeholder='Search blogs' 
                        onChange={handleChange}
                    />
                </div>
                <div className='col-md-4'>
                    <button className='btn btn-block btn-outline-primary' type='submit'>Search</button>
                </div>
            </div>
        </form>
    )

    return (
        <div className='container-fluid'>
            <div className='pt-3 pb-5'>
                {showSearchForm()}
                {searched && <div style={{ marginTop: '-100px', marginBottom: '-120px' }}>{showSearchedBlogs()}</div>}
            </div>
        </div>
    );
}

export default Search;