import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Bookings() {
    // State variables
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewText, setReviewText] = useState("");
    const [selectedBookingId, setSelectedBookingId] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // For frontend validation error

    useEffect(() => {
        fetchBookings();
    }, []);

    // Function to fetch bookings
    const fetchBookings = async () => {
        try {
            const username = localStorage.getItem('username');
            const response = await Axios.get('http://localhost:3000/bookings', {
                params: { name: username }
            });
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    // Function to handle completing a booking
    const handleCompleteBooking = (bookingId) => {
        setSelectedBookingId(bookingId);
    };

    // Function to handle submitting a review
    const handleSubmitReview = async () => {
        try {
            // Frontend validation
            if (!reviewText.trim()) {
                setErrorMessage('Please enter a review.');
                return;
            }

            // Clear error message if validation passes
            setErrorMessage('');

            const username = localStorage.getItem('username');
            const selectedBooking = bookings.find(booking => booking._id === selectedBookingId);
            const response = await Axios.post('http://localhost:3000/reviews', {
                username: username,
                service: selectedBooking.service,
                location: selectedBooking.location,
                price: selectedBooking.price,
                review: reviewText
            });
            console.log('Review submitted:', response.data);
            await Axios.delete(`http://localhost:3000/bookings/${selectedBookingId}`);
            fetchBookings();
            setReviewText("");
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookings">Bookings</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/support">Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reviews">Reviews</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/customizedTrips">Customized Trips</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Bookings */}
            <div className="container">
                <h2 className="text-center my-4">Your Bookings</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        bookings.map((booking, index) => (
                            <div key={index} className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{booking.service}</h5>
                                        <p className="card-text">Location: {booking.location}</p>
                                        <p className="card-text">Price: {booking.price}</p>
                                        <p className="card-text">Description: {booking.description}</p>
                                        <button onClick={() => handleCompleteBooking(booking._id)} className="btn btn-primary">Complete</button>
                                        {selectedBookingId === booking._id && (
                                            <div>
                                                {/* Frontend validation error message */}
                                                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                                                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a review" className="form-control mt-2"></textarea>
                                                <button onClick={handleSubmitReview} className="btn btn-success mt-2">Submit Review</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Bookings;
