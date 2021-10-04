import axios from 'axios';
import cookie from 'js-cookie';

import { API } from '../config';

const axiosRegisterUser = axios.create({
    baseURL: `${API}/auth/register`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosLoginUser = axios.create({
    baseURL: `${API}/auth/login`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosLogoutUser = axios.create({
    baseURL: `${API}/auth/logout`,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const getPublicProfile = async username => {
    try {
        const res = await axios({
            url: `${API}/auth/${username}`,
            method: 'GET'
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const getUser = async token => {
    try {
        const res = await axios({
            url: `${API}/auth/`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const updateUser = async (token, user) => {
    try {
        const res = await axios({
            url: `${API}/auth/update`,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            data: user
        });
        return res;

    } catch (err) {
        return err.response;
    }
}

export const registerUser = async user => {
    try {
        const res = await axiosRegisterUser({
            data: JSON.stringify(user)
        });

        return res;

    } catch (err) {
        return err.response;
    }
}

export const loginUser = async user => {
    try {
        const res = await axiosLoginUser({
            data: JSON.stringify(user)
        });

        return res;

    } catch (err) {
        return err.response;
    }
}

export const logoutUser = async (callback) => {
    try {
        removeCookie('token');
        removeLocalStorage('user');
        callback();

        const res = await axiosLogoutUser();
        return res.data;

    } catch (err) {
        return err.response;
    }
}

export const setCookie = (key, value) => {
    // check if this function is running on the client side
    if (process.browser) {
        cookie.set(key, value);
    }
}

export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key);
    }
}

export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
}

export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
}

// set token in cookie and localstorage
export const storeAuthInfo = (data, callback) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    callback();
}

export const isAuth = () => {
    if (process.browser) {
        const cookie = getCookie('token');
        if (cookie) {
            const user = localStorage.getItem('user');
            if (user !== undefined) return JSON.parse(user);
        }
    }
    return false;
}