import axios from 'axios';

import { API } from '../config';

export const createBlog = async (blog, token) => {
    try {
        const res = await axios.post(`${API}/blogs`,{
            headers: {
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

export const getAllBlogsWithCategoriesAndTags = async (limit = 10, skip = 0) => {
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