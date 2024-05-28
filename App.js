import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FirstPage from './pages/firstPage';
import Login from './pages/login';
import SignUp from './pages/signup';
import Search from './pages/search';
import Bookings from './pages/bookings';
import Support from './pages/SupportMenu';
import Reviews from './pages/Reviews';
import CustomizedTrips from './pages/CustomizedTrips'; // Import CustomizedTrips component
import './pages/SignUp.css';
import './App.css';
import './pages/FirstPage.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS




function App() {
    return (
        <div className="App">
            <Router>
                <div className="pages">
                    <Routes>
                        <Route path="/" element={<FirstPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/customizedTrips" element={<CustomizedTrips />} /> {/* Add Route for CustomizedTrips component */}
                        <Route path="*" element={<Navigate to="/" />} />
                   

                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
