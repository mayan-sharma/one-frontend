import axios from 'axios';

import { API } from '../config';

export const emailContact = async (data) => {
    try {
        let endpoint;
        if (data.userEmail) {
            endpoint = `${API}/contact/contactUser`
        } else {
            endpoint = `${API}/contact`
        }

        const res = await axios({
            url: endpoint,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });
        return res;

    } catch (err) {
        return err.response;
    }
}