import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import '../../node_modules/react-quill/dist/quill.snow.css';

import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const Blog = ({ router }) => {

    const getBlogFromLS = () => {
        if (window) {
            if (localStorage.getItem('blog')) {
                return JSON.parse(localStorage.getItem('blog'));
            }
        }
        return false;
    }

    const [body, setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);

    const [values, setValues] = useState({
        error: '',
        success: false,
        title: '',
        formData: '',
        loading: false
    });

    const { error, success, title, formData, loading } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        });
        setBody(getBlogFromLS());
        initCategories();
        initTags();

    }, [router]);

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

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await createBlog(formData, token);
            if (res.status === 200) {
                setValues({
                    ...values,
                    error: '',
                    success: res.data.message
                })
            } else {
                setValues({
                    ...values,
                    success: '',
                    error: res.data.message
                });
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

    const handleEditorChange = e => {
        setBody(e);
        formData.set('body', e);
        if (window) {
            localStorage.setItem('blog', JSON.stringify(e));
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

    const showCategories = categories => (
        categories && (
            categories.map((category, i) => (
                <li key={category.id} className='list-unstyled'>
                    <input onChange={() => handleToggleCategories(category.id)} type='checkbox' className='mr-2' />
                    <label className='form-check-label'>{category.name}</label>
                </li>
            ))
        )
    )

    const showTags = tags => (
        tags && (
            tags.map((tag, i) => (
                <li key={tag.id} className='list-unstyled'>
                    <input onChange={() => handleToggleTags(tag.id)} type='checkbox' className='mr-2' />
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
                    <form onSubmit={handleSubmit}>
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
                                modules={Blog.modules}
                                formats={Blog.formats}
                                value={body}
                                placeholder='Write here...'
                                onChange={handleEditorChange}
                            />
                        </div>
                        <div>
                            <button
                                type='submit'
                                className='btn btn-primary'
                            >
                                Publish
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
                            <h5>Feature Image</h5>
                            <hr />
                            <small className='text-muted mr-2'>Max size: 1mb</small>
                            <label className='btn btn-outline-info'>
                                Upload image
                                <input onChange={(e) => handleChange(e, 'photo')} type='file' accept='image/*' hidden />
                            </label>
                        </div>
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
    );
}

Blog.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

Blog.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
]

export default withRouter(Blog);