import { useState, useEffect } from "react";
import Link from 'next/link';
import Router from 'next/router';

import { getCookie } from '../../actions/auth';
import { createCategory, getCategories, removeCategory } from "../../actions/category";
import useForm from "../../lib/useForm";

const Category = () => {
    
    const [values, setValues] = useState({
        name:'',
        error: null,
        success: false,
        categories: [],
        isDeleted: false,
        reload: false
    });

    const { name, error, success, categories, isDeleted, reload } = values;
    const token = getCookie('token');

    useEffect(async () => {
        try {
            const res = await getCategories();
            if (res.status === 200) {
                setValues({
                    ...values,
                    categories: res.data.categories,
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
            await removeCategory(slug, token);
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
            const res = await createCategory(name, token);
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

    const showCategories = categories => (
        categories.map((category, i) => (
            <button 
                title='Double click to delete!' 
                key={category.id} 
                className='btn btn-outline-primary mr-1 ml-1 mt-3'
                onDoubleClick={() => handleDelete(category.slug)}
            >
                { category.name }
            </button>
        ))
    );

    const showSuccess = () => (
        success && (
            <p className='text-success'>Category Created</p>
        )
    );

    const showRemoved = () => (
        isDeleted && (
            <p className='text-danger'>Category Deleted</p>
        )
    );

    const showError = () => (
        error && (
            <p className='text-danger'>Category Already Exists</p>
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
                { showCategories(categories) }
            </div>
        </>
    );

}

export default Category;