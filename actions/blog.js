import axios from 'axios';

import { API } from '../config';

export const createBlog = async (blog, token) => {
    try {
        const res = await axios({
            url: `${API}/blogs`,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            data: blog
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getAllBlogsWithCategoriesAndTags = async (limit, skip) => {
    try {
        // next requires hard coded address for SSR 
        const res = await axios.get('http://localhost:8000/api/blogs/blogs-categories-tags', {
            params: {
                limit, skip
            }
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getBlog = async slug => {
    try {
        const res = await axios({
            url: `${API}/blogs/${slug}`,
            method: 'GET'
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getRelatedBlog = async (slug, limit) => {
    try {
        const res = await axios({
            url: `${API}/blogs/related/${slug}`,
            method: 'GET',
            params: { limit }
        });
        return res;

    } catch (err) {
        return err.response;
    }
}