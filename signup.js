import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const SignUp = () => {
    // State variables for user input
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // State variable for error message
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle form submission
    const createUser = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Frontend validation
        if (!name.trim() || !username.trim() || !password.trim()) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Clear error message if validation passes
        setErrorMessage('');

        Axios.post('http://localhost:3000/signup', { name, username, password })
            .then((response) => {
                alert('USER CREATED');
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div className="container">
            {/* Sign-Up Form */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form id="contact-form" onSubmit={createUser} className="mt-5">
                        {/* Name input field */}
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                name="name" 
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        {/* Username input field */}
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                name="username" 
                                className="form-control"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        {/* Password input field */}
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                name="password" 
                                className="form-control"
                                placeholder="Enter your Password"
                                required
                            />
                        </div>
                        {/* Error message for frontend validation */}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {/* Submit button */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-lg btn-primary">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {/* Login link */}
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
