import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
    const [agencies, setAgencies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgencies();
    }, []);

    const fetchAgencies = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/search');
            setAgencies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    const handleBook = async (agency) => {
        try {
            const username = localStorage.getItem('username'); // Fetch username from local storage
            const bookingData = {
                name: username,
                service: agency.service,
                location: agency.location,
                price: agency.price,
                description: agency.description
            };
            await Axios.post('http://localhost:3000/bookings', bookingData);
            alert('Booking successful!');
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Booking failed. Please try again later.');
        }
    };

    return (
        <div>
            {/* Navbar */}
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
            <div className="container">
                <h2 className="text-center my-4">Search Travel Agencies</h2>
                {/* Form elements */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="row">
                        {agencies.map((agency, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{agency.service}</h5>
                                        <p className="card-text">Location: {agency.location}</p>
                                        <p className="card-text">Price: {agency.price}</p>
                                        <p className="card-text">Description: {agency.description}</p>
                                        <button className="btn btn-primary" onClick={() => handleBook(agency)}>Book</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
