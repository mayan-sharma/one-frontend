import axios from 'axios';

import { API } from '../config';

const axiosCreateCategory = axios.create({
    baseURL: `${API}/categories`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosGetCategories = axios.create({
    baseURL: `${API}/categories`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// const axiosRemoveCategory = axios.create({
//     baseURL: `${API}/category`,
//     method: 'DELETE',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });

export const createCategory = async (name, token) => {
    try {
        const res = await axiosCreateCategory({
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify({ name })
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getCategories = async () => {
    try {
        const res = await axiosGetCategories();
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getCategory = async slug => {
    try {
        const res = await axios({
            url: `${API}/categories/${slug}`,
            method: 'GET'
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const removeCategory = async (slug, token) => {
    try {
        const res = await axios.delete(`${API}/categories/${slug}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;

    } catch (err) {
        return err.response;
    }
}