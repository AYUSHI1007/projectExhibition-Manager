/*/ frontend/src/components/Login.js
import React, { FC } from 'react';
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState<string>('username');
    const [password, setPassword] = useState<string>('password');
    const [role, setRole] = useState<string>('student');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password, role });
            localStorage.setItem('token', response.data.token);
            if (role=='student'){
                navigate('/studentprofile');
            }else if(role=='faculty'){
                navigate('/facultyprofile');
            } else {
                setErrorMessage('Unknown role');
            }
            
        } catch (error) {
            setErrorMessage('Invalid username or password');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{ margin: '10px 0', padding: '10px', width: '100%' }}
                />
                <input
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ margin: '10px 0', padding: '10px', width: '100%' }}
                />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                </select>
                <button type="submit" style={{ padding: '10px 15px' }} onClick = {handleSubmit}>Login</button>
            </form>
        </div>
    );
};

export default Login;*/