import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        age: '',
        work: '',
        email: '',
        address: '',
        salary: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log('Form data being sent:', formData); // Log the form data for debugging
        try {
            const response = await axios.post('http://localhost:3000/person/signup', formData);
            alert('Signup successful!');
            console.log('Response from backend:', response.data);
        } catch (err) {
            console.error('Error during signup:', err);
            if (err.response && err.response.data.message) {
                alert(`Signup failed: ${err.response.data.message}`);
            } else {
                alert('Signup failed: An unexpected error occurred');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
            <select name="work" onChange={handleChange} required>
                <option value="">Select Work</option>
                <option value="developer">Developer</option>
                <option value="manager">Manager</option>
                <option value="analyst">Analyst</option>
            </select>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
            <input type="number" name="salary" placeholder="Salary" onChange={handleChange} required />
            <button type="submit">Signup</button>
        </form>
    );
}

export default Signup;