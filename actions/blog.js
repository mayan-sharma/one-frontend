import axios from 'axios';

import { API } from '../config';

const axiosCreateBlog = axios.create({
    baseURL: `${API}/blog`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }
});

export const createBlog = async (blog, token) => {
    try {
        const res = await axiosCreateBlog({
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: blog
        });
        return res;

    } catch (err) {
        return err.response;
    }
}