import React, { useState } from 'react';
import './SignUpPage.css';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const LogInPage = () => {

    const firebase = useFirebase()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await firebase.signInUserWithEmailAndPassword(formData.email, formData.password)
            navigate('/collections')
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Status: ${errorCode} and Error: ${errorMessage}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="Commonform">
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Log In</button>
        </form>
    );
};

export default LogInPage;