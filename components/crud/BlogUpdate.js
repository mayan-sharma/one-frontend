import Link from 'next/link';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import '../../node_modules/react-quill/dist/quill.snow.css';

import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog, getBlog, updateBlog } from '../../actions/blog';
import { QuillModules, QuillFormats } from '../../config';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdate = ({ router }) => {

    const [body, setBody] = useState({});
    const [values, setValues] = useState({
        error: '',
        success: false,
        formData: '', // ssr
        title: ''
    });

    const { error, success, formData, title } = values;

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        })
        initBlog();

    }, [router])

    const initBlog = async () => {
        try {
            if (router.query.slug) {
                const res = await getBlog(router.query.slug);
                if (res.status === 200) {
                    setBody(res.data.blog);
                    setValues({
                        ...values,
                        title: res.data?.blog?.title || ''
                    });
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e, name) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value,
            formData,
            error: ''
        });
    }

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    }

    const handleEdit = () => {

    }

    const showError = () => (
        error && (
            <div className='alert alert-danger'>
                {error}
            </div>
        )
    )

    const showSuccess = () => (
        success && (
            <div className='alert alert-success'>
                {success}
            </div>
        )
    )

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8'>
                    <form onSubmit={handleEdit}>
                        <div className='form-group'>
                            <label className='text-muted'>Title</label>
                            <input
                                className='form-control'
                                value={title}
                                onChange={(e) => handleChange(e, 'title')}
                            />
                        </div>
                        <div className='form-group'>
                            <ReactQuill
                                modules={QuillModules}
                                formats={QuillFormats}
                                value={body}
                                placeholder='Write here...'
                                onChange={handleBody}
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='btn btn-primary'
                            >
                                Update
                            </button>
                            <div className='mt-2'>
                                {showError()}
                                {showSuccess()}
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-md-4'>
                    <div>
                        <div className='form-group pb-2'>
                            <h5>Featured Image</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(BlogUpdate);