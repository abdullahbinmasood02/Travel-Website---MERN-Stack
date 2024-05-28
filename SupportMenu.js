import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Support() {
    // State variables for email and message inputs
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // State variables for error messages
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Frontend validation
        if (!email.trim()) {
            setEmailError('Please enter your email.');
            return;
        } else {
            setEmailError('');
        }

        if (!message.trim()) {
            setMessageError('Please enter your message.');
            return;
        } else {
            setMessageError('');
        }

        try {
            // Fetch username from local storage
            const username = localStorage.getItem('username');
            // Check if username is available
            if (!username) {
                throw new Error('Username not found in local storage');
            }
            // Prepare data for support request
            const supportData = { username, email, message };
            // Send support request to backend
            await Axios.post('http://localhost:3000/support', supportData);
            // Display success message
            alert('Support request submitted successfully!');
            // Clear form fields after submission
            setEmail('');
            setMessage('');
        } catch (error) {
            // Log and display error message
            console.error('Error submitting support request:', error);
            alert('Failed to submit support request. Please try again later.');
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <header className="mb-4">
                <h1 className="text-center">Customer Support</h1>
                {/* Navbar */}
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bookings">Bookings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/support">Support</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">Reviews</Link>
                        </li> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/customizedTrips">Customized Trips</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* Support Form */}
            <section id="support-form">
                <h2>Contact Support</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email input field */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className={`form-control ${emailError ? 'is-invalid' : ''}`} 
                            required 
                        />
                        {/* Email error message */}
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    {/* Message input field */}
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message:</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="4" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            className={`form-control ${messageError ? 'is-invalid' : ''}`} 
                            required 
                        ></textarea>
                        {/* Message error message */}
                        {messageError && <div className="invalid-feedback">{messageError}</div>}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
            {/* Footer */}
            <footer className="mt-4">
                <p className="text-center">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Support;
