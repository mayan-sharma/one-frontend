import useForm from '../../lib/useForm';

const Register = () => {
    
    const { inputs, handleChange } = useForm({
        email: '',
        name: '',
        password: ''
    });

    const handleSubmit = e => {
        e.preventDefault();
        console.table(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <input 
                    type='text'
                    name='name'
                    className='form-control'
                    placeholder='Enter your name'
                    onChange={handleChange}
                    value={inputs.name}
                />
            </div>
            <div className='form-group'>
                <input 
                    type='email'
                    name='email'
                    className='form-control'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    value={inputs.email}
                />
            </div>
            <div className='form-group'>
                <input 
                    type='password'
                    name='password'
                    className='form-control'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    value={inputs.password}
                />
            </div>
            <div>
                <button className='btn btn-primary'>Login</button>
            </div>
        </form>
    );
}

export default Register;