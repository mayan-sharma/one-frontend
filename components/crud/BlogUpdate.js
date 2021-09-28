import { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import '../../node_modules/react-quill/dist/quill.snow.css';

import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { getBlog, updateBlog } from '../../actions/blog';
import { QuillModules, QuillFormats } from '../../config';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogUpdate = ({ router }) => {

    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);

    const [values, setValues] = useState({
        error: '',
        success: false,
        formData: '', // ssr
        title: ''
    });

    const { error, success, formData, title } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
        initCategories();
        initTags();

    }, [router])

    const initBlog = async () => {
        try {
            if (router.query.slug) {
                const res = await getBlog(router.query.slug);
                if (res.status === 200) {
                    setBody(res.data?.blog?.body || '');
                    setCategoriesArray(res.data?.blog?.Categories || []);
                    setTagsArray(res.data?.blog?.Tags || []);
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

    const setCategoriesArray = categories => {
        let catArr = [];
        categories.forEach(category => catArr.push(category.id));
        setCheckedCategories(catArr);
    }

    const setTagsArray = tags => {
        let tagArr = [];
        tags.forEach(tag => tagArr.push(tag.id));
        setCheckedTags(tagArr);
    }

    const initCategories = () => {
        getCategories()
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data.categories);
                } else {
                    setValues({ ...values, error: res.data.message });
                }
            })
            .catch(err => console.log(err));
    }

    const initTags = () => {
        getTags()
            .then(res => {
                if (res.status === 200) {
                    setTags(res.data.tags);
                } else {
                    setValues({ ...values, error: res.data.message });
                }
            })
            .catch(err => console.log(err));
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

    const handleEdit = async e => {
        e.preventDefault();
        try {
            const res = await updateBlog(formData, router.query.slug, token);
            console.log(res);
            if (res.status === 200) {
                setValues({
                    ...values,
                    title: '',
                    success: res.data.message,
                });
                if (isAuth() && isAuth().role === 1) {
                    Router.replace('/admin')
                } else {
                    Router.replace('/user')
                }

            } else {
                setValues({
                    ...values,
                    err: res.data.message
                })
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleToggleCategories = (id) => {
        setValues({
            ...values,
            error: ''
        });

        const clickedItem = checkedCategories.indexOf(id);
        const currCategories = [...checkedCategories];

        if (clickedItem === -1) {
            currCategories.push(id);
        } else {
            currCategories.splice(clickedItem, 1);
        }

        setCheckedCategories(currCategories);
        formData.set('categories', currCategories);
    }

    const handleToggleTags = (id) => {
        setValues({
            ...values,
            error: ''
        });

        const clickedItem = checkedTags.indexOf(id);
        const currTags = [...checkedTags];

        if (clickedItem === -1) {
            currTags.push(id);
        } else {
            currTags.splice(clickedItem, 1);
        }

        setCheckedTags(currTags);
        formData.set('tags', currTags);
    }

    const findCategory = id => {
        const res = checkedCategories.indexOf(id);
        if (res !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const findTag = id => {
        const res = checkedTags.indexOf(id);
        if (res !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const showCategories = categories => (
        categories && (
            categories.map((category, i) => (
                <li key={category.id} className='list-unstyled'>
                    <input 
                        onChange={() => handleToggleCategories(category.id)} 
                        checked={findCategory(category.id)} 
                        type='checkbox' 
                        className='mr-2' 
                    />
                    <label className='form-check-label'>{category.name}</label>
                </li>
            ))
        )
    )

    const showTags = tags => (
        tags && (
            tags.map((tag, i) => (
                <li key={tag.id} className='list-unstyled'>
                    <input 
                        onChange={() => handleToggleTags(tag.id)} 
                        checked={findTag(tag.id)}
                        type='checkbox' 
                        className='mr-2'
                    />
                    <label className='form-check-label'>{tag.name}</label>
                </li>
            ))
        )
    )

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
                            <hr />
                            <small className='text-muted mr-2'>Max size: 1mb</small>
                            <label className='btn btn-outline-info'>
                                Upload image
                                <input onChange={(e) => handleChange(e, 'photo')} type='file' accept='image/*' hidden />
                            </label>
                        </div>
                        <div>
                            <h5>Categories</h5>
                            <hr />
                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                {showCategories(categories)}
                            </ul>
                        </div>
                        <div>
                            <h5>Tags</h5>
                            <hr />
                            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                {showTags(tags)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(BlogUpdate);