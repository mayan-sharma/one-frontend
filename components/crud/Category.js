import { useState, useEffect } from "react";
import Link from 'next/link';
import Router from 'next/router';

import { getCookie } from '../../actions/auth';
import { createCategory, getCategories } from "../../actions/category";
import useForm from "../../lib/useForm";

const Category = () => {
    
    const [values, setValues] = useState({
        name:'',
        error: null,
        success: false,
        categories: [],
        isDeleted: false
    });

    const { name, error, success, categories, isDeleted } = values;
    const token = getCookie('token');

    useEffect(async () => {
        const res = await getCategories();

    }, [categories]);

    
    const handleChange = e => {
        setValues({
            ...values,
            name: e.target.value,
            error: null,
            success: false,
            isDeleted: false
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await createCategory(name, token);
            console.log(res);

        } catch (err) {
            // setValues({
            //     error: err,
            //     success: false
            // })
            console.log(err.response);
        }
    }


    return (
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
    );

}

export default Category;