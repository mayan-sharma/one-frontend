import { useState } from 'react';

export default function useForm(initial = {}) {

    const [inputs, setInputs] = useState(initial);

    const handleChange = e => {
        let { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const clearForm = () => {
        const blankState = Object.fromEntries(Object.entries(inputs).map(([key, val]) => [key, '']));
        setInputs(blankState);
    }

    return { inputs, handleChange, clearForm };
}