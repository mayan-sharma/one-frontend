import axios from 'axios';

import { API } from '../config';

const axiosCreateTag = axios.create({
    baseURL: `${API}/tag`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosGetTags = axios.create({
    baseURL: `${API}/tag`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// const axiosRemoveTag = axios.create({
//     baseURL: `${API}/Tag`,
//     method: 'DELETE',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// });

export const createTag = async (name, token) => {
    try {
        const res = await axiosCreateTag({
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

export const getTags = async () => {
    try {
        const res = await axiosGetTags();
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getTag = async slug => {
    try {
        const res = await axiosGetTags({
            data: JSON.stringify({ slug })
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const removeTag = async (slug, token) => {
    try {
        const res = await axios.delete(`${API}/tag/${slug}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;

    } catch (err) {
        return err.response;
    }
}