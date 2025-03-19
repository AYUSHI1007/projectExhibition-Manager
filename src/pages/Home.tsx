// frontend/src/components/Home.js
import React, { FC } from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();;

    const gologin =() => {
        navigate('/login');
    }

    const gosignup = () => {
        navigate('/signup');
    }
    return (
        <div>
            <h1>Welcome to the Project Approval System</h1>
            <button onClick={() => {navigate('/login');}}>login</button> <button onClick={() => {navigate('/signup');}}>signup</button>
        </div>
    );
};

export default Home;