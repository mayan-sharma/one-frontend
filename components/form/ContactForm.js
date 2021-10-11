import { useState } from 'react';
import Link from 'next/link';

import { emailContact } from '../../actions/form';

const ContactForm = ({ userEmail }) => {

    const [values, setValues] = useState({
        message: '',
        name: '',
        email: '',
        success: '',
        error: '',
        loading: false
    });

    const { message, name, email, success, error, loading } = values;

    const handleChange = (e, name) => {
        setValues({
            ...values,
            [name]: e.target.value,
            success: '',
            error: '',
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setValues({
                ...values,
                loading: true
            });
            const res = await emailContact({ name, email, message, userEmail });
            if (res.status === 200) {
                setValues({
                    ...values,
                    loading: false,
                    success: res.data.message,
                    error: '',
                    name: '',
                    email: '',
                    message: ''
                });

            } else {
                setValues({
                    ...values,
                    loading: false,
                    error: res.data.message
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

    const showError = () => (
        error && (
            <div className='alert alert-danger'>
                {error}
            </div>
        )
    )

    const showSuccess = () => (
        success && (
            <div className='alert alert-success'>
                {success}
            </div>
        )
    )

    const showContactForm = () => (
        <form onSubmit={handleSubmit} className='pb-5'>
            <div className='form-group'>
                <label className='lead'>Name</label>
                <input
                    type='text'
                    onChange={e => handleChange(e, 'name')}
                    className='form-control'
                    value={name}
                    required
                />
            </div>
            <div className='form-group'>
                <label className='lead'>Email</label>
                <input
                    type='email'
                    onChange={e => handleChange(e, 'email')}
                    className='form-control'
                    value={email}
                    required
                />
            </div>
            <div className='form-group'>
                <label className='lead'>Message</label>
                <textarea
                    onChange={e => handleChange(e, 'message')}
                    type='text'
                    className='form-control'
                    value={message}
                    rows='10'
                ></textarea>
            </div>
            <div>
                <button disabled={loading} className='btn btn-primary'>Send</button>
            </div>
            <div className='mt-2'>
                {showError()}
                {showSuccess()}
            </div>
        </form>
    )

    return (
        <>
            {showContactForm()}
        </>
    );
}

export default ContactForm;