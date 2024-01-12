import React, { useState } from 'react';
import './SignUpPage.css';
import { useFirebase } from '../context/firebase';

const SignUpPage = () => {

    const firebase = useFirebase()

    const [formData, setFormData] = useState({
        name: '',
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
            await firebase.signupUserWithEmailAndPassword(formData.email, formData.password)
            await firebase.putData(`users/${formData.name}`, formData)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Status: ${errorCode} and Error: ${errorMessage}`);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="Commonform">
            <label>
                Name:
                <input
                    type="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>

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

            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <button type="submit">Sign Up</button>
                <button className='google-button' type="button" onClick={firebase.signupWithGoogle}>
                    Sign Up with Google
                </button>
            </div>
        </form>
    );
};

export default SignUpPage;