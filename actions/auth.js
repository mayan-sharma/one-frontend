import axios from 'axios';

import { API } from '../config';

const axiosRegisterUser = axios.create({
    baseURL: `${API}/auth/register`,
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

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