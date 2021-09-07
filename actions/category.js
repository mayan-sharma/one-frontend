import axios from 'axios';

import { API } from '../config';

const axiosCreateCategory = axios.create({
    baseURL: `${API}/category`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosGetCategories = axios.create({
    baseURL: `${API}/category`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

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