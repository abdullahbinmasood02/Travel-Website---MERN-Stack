import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const username = localStorage.getItem('username'); // Get username from local storage
            const response = await Axios.get('http://localhost:3000/reviews', {
                params: { username: username } // Pass username as a query parameter
            });
            console.log('Fetched reviews:', response.data);
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div className="container">
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

            <h2 className="mt-4">Your Reviews</h2>
            {/* Loading message or reviews list */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Check if reviews exist */}
                    {reviews.length === 0 ? (
                        <p>No reviews found.</p>
                    ) : (
                        <ul className="list-group">
    {/* Sort reviews alphabetically by location before mapping */}
    {reviews.sort((a, b) => a.location.localeCompare(b.location)).map((review, index) => (
        <li key={index} className="list-group-item">
            <p className="mb-1">Service: {review.service}</p>
            <p className="mb-1">Location: {review.location}</p>
            <p className="mb-1">Price: {review.price}</p>
            <p className="mb-0">Review: {review.review}</p>
        </li>
    ))}
</ul>

                    )}
                </div>
            )}
        </div>
    );
}

export default Reviews;
