import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        // Frontend validation
        if (!name.trim() || !password.trim()) {
            setErrorMessage('Please enter both username and password.');
            return;
        }

        // Clear error message if validation passes
        setErrorMessage('');

        localStorage.setItem('username', name);
        // Perform login logic here
        // For demonstration, simply navigate to the home page
        navigate('/search');
    };

    return (
        <div className="login">
            <div className="container">
                <h1 className="text-center mb-4">Login</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form id="contact-form" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="name" 
                                    placeholder="Enter name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                            {/* Display error message */}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <div className="text-center">
                                <button type="submit" className="btn btn-lg btn-outline-secondary">Login</button>
                            </div>
                        </form>
                        <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
