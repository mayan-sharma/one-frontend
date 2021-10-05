import { useState, useEffect } from "react";
import { getCookie, getUser, updateUser } from "../../actions/auth";
import { API } from '../../config';

const ProfileUpdate = () => {

    const token = getCookie('token');
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        success: '',
        error: '',
        loading: false,
        formData: ''
    });

    const { username, name, email, password, error, success, loading, formData } = values;

    useEffect(async () => {
        try {
            const res = await getUser(token);
            if (res.status === 200) {
                setValues({
                    ...values,
                    username: res.data.user.username,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    formData: new FormData()
                });
            }

        } catch (err) {
            console.log(err);
        }

    }, []);

    const handleChange = (e, name) => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value,
            formData,
            error: '',
            success: ''
        });
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            setValues({
                ...values,
                loading: true
            });
            const res = await updateUser(token, formData);
            if (res.status === 200) {
                setValues({
                    ...values,
                    loading: false,
                    success: 'User updated successfully!'
                });
            } else {
                setValues({
                    ...values,
                    loading: false,
                    success: '',
                    error: res.data.message
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

    const updateForm = () => (
        <form>
            <div className='form-group'>
                <label className='btn btn-outline-info'>
                    Upload image
                    <input
                        type='file'
                        accept='image/*'
                        className='form-control'
                        onChange={(e) => handleChange(e, 'photo')}
                        hidden
                    />
                </label>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Username</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => handleChange(e, 'username')}
                    value={username}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => handleChange(e, 'name')}
                    value={name}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => handleChange(e, 'email')}
                    value={email}
                />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    type='password'
                    className='form-control'
                    onChange={(e) => handleChange(e, 'password')}
                    value={password}
                />
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleSubmit} disabled={loading}>Update</button>
                <div className='mt-2'>
                    {showError()}
                    {showSuccess()}
                </div>
            </div>
        </form>
    );

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

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img 
                            src={`${API}/auth/photo/${username}`}
                            className='img img-fluid img-thumbnail mb-3'
                            style={{ maxHeight: 'auto', maxWidth: '100%' }}
                            alt='profile photo'
                        />
                    </div>
                    <div className='col-md-8 mb-5'>
                        {updateForm()}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileUpdate;