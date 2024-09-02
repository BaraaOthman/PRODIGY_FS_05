import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import UserService from '../UserServices.js';
import "../styles/Login.css";
import { Link } from 'react-router-dom';

const Login = () => {
    const [cookies, setCookie] = useCookies(['username']);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        const formDataObj = new FormData();
        formDataObj.append("username", formData.username);
        formDataObj.append("password", formData.password);

        event.preventDefault();
        try {
            const response = await UserService.login(formData);
            setMessage(response.data.message);
            if (response.data.success) {
                setCookie('username', formData.username, { path: '/' });
                navigate('/');
            }
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred.');
        }
    };

    return (
        <div className="login-register-container">
            <h1 className='h1'>Login</h1> 
            {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="formFieldInput"
                        placeholder="Enter your username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="formFieldInput"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="footer">
            <p>Don't have an account? <Link to="/Register">Sign Up Here</Link></p>
            </div>
        </div>
    );
};

export default Login;
