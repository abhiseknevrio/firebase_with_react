import React, { useState } from 'react';
import './SignUpPage.css';
import { useFirebase } from '../context/firebase';

const Collections = () => {

    const firebase = useFirebase()

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        city: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // add Collection
        // firebase.writeDataOnfirestore(`users`, formData)

        // add Sub Collection Nested 
        // we add parameter in "/xyz"
        firebase.writeDataOnfirestore(`users/lKzCdZsBIJWwXWIAyWg4/places`, {
            city: formData.city,
            date: Date.now()
        })
    };

    return (
        <form onSubmit={handleSubmit} className="Commonform">
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Age:
                <input
                    type="number"
                    name="age"
                    value={formData.age}
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
                City:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Create</button>
        </form>
    );
};

export default Collections;