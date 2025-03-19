/*/ frontend/src/components/Signup.js
import React, { FC } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role, setRole] = useState<string>('student'); // Default role
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/signup', { username, password, role });
            navigate('/login');
            
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // Show error message from backend
            } else {
                setErrorMessage('An unexpected error occurred.'); // Fallback for unexpected errors
            }
        }
    };

    

    return (
        <div style={{ padding: '20px' }}>
            <h2>Signup</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <button type="submit" onClick={handleSubmit}>Signup</button>
            </form>
        </div>
    );
};

export default Signup;*/