import { useState, useEffect } from "react";
import Link from 'next/link';
import Router from 'next/router';

import { getCookie } from '../../actions/auth';
import { createTag, getTags, removeTag } from "../../actions/tag";

const Tag = () => {
    
    const [values, setValues] = useState({
        name:'',
        error: null,
        success: false,
        tags: [],
        isDeleted: false,
        reload: false
    });

    const { name, error, success, tags, isDeleted, reload } = values;
    const token = getCookie('token');

    useEffect(async () => {
        try {
            const res = await getTags();
            if (res.status === 200) {
                setValues({
                    ...values,
                    tags: res.data.tags,
                    error: null
                });

            } else {
                setValues({
                    ...values,
                    error: res.data.message
                });
            }

        } catch (err) {
            console.log(err);
        }

    }, [reload]);

    
    const handleChange = e => {
        setValues({
            ...values,
            name: e.target.value,
            error: null,
            success: false,
            isDeleted: false
        });
    }

    const handleDelete = async (slug) => {
        try {
            await removeTag(slug, token);
            setValues({
                ...values,
                success: false,
                isDeleted: true,
                error: null,
                reload: !reload
            });

        } catch (err) {
            setValues({
                ...values,
                error: err
            });
            console.log(err);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await createTag(name, token);
            setValues({
                ...values,
                reload: !reload,
                success: true,
                isDeleted: false
            })

        } catch (err) {
            setValues({
                ...values,
                error: err,
                success: false
            })
            console.log(err.response);
        }
    }

    const handleMouseMove = e => {
        setValues({
            ...values,
            error: false,
            success: false,
            isDeleted: false
        });
    } 

    const showTags = tags => (
        tags.map((tag, i) => (
            <button 
                title='Double click to delete!' 
                key={tag.id} 
                className='btn btn-outline-primary mr-1 ml-1 mt-3'
                onDoubleClick={() => handleDelete(tag.slug)}
            >
                { tag.name }
            </button>
        ))
    );

    const showSuccess = () => (
        success && (
            <p className='text-success'>Tag Created</p>
        )
    );

    const showRemoved = () => (
        isDeleted && (
            <p className='text-danger'>Tag Deleted</p>
        )
    );

    const showError = () => (
        error && (
            <p className='text-danger'>Tag Already Exists</p>
        )
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input 
                        type='text'
                        className='form-control'
                        onChange={handleChange}
                        value={name}
                        required
                    />
                </div>
                <div>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
            <div className='mt-3'>
                { showSuccess() }
                { showError() }
                { showRemoved() }
            </div>
            <div onMouseMove={handleMouseMove}>
                { showTags(tags) }
            </div>
        </>
    );

}

export default Tag;