import React, { useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function CustomizedTrips() {
    // State variables for form fields
    const [service, setService] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    // State variable for error message
    const [errorMessage, setErrorMessage] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Frontend validation
            if (!service.trim() || !location.trim() || !price || !description.trim()) {
                setErrorMessage('Please fill in all fields.');
                return;
            }

            // Clear error message if validation passes
            setErrorMessage('');

            const name = localStorage.getItem('username');
            await Axios.post('http://localhost:3000/customizedTrip', {
                name,
                service,
                location,
                price,
                description
            });
            alert('Customized trip created successfully!');
            // Clear form fields after submission
            setService("");
            setLocation("");
            setPrice("");
            setDescription("");
        } catch (error) {
            console.error('Error creating customized trip:', error);
            alert('Failed to create customized trip. Please try again later.');
        }
    };

    return (
        <div className="container">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/search">Search</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/bookings">Bookings</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/reviews">Reviews</Link></li> 
                        <li className="nav-item"><Link className="nav-link" to="/customizedTrips">Customized Trips</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Create Customized Trip Form */}
            <div className="mt-4">
                <h2>Create Customized Trip</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Service:</label>
                        <input type="text" value={service} onChange={(e) => setService(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Location:</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price:</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required />
                    </div>
                    {/* Error message for frontend validation */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button type="submit" className="btn btn-primary">Create Trip</button>
                </form>
            </div>
        </div>
    );
}

export default CustomizedTrips;
