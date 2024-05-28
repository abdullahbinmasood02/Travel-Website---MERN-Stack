import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './FirstPage.css'; // Import CSS file if needed

const FirstPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="buttons">
                        <h1>Already have an Account?</h1>
                        <Link to="/login">
                            <button className="btn btn-outline-secondary btn-lg">Login</button>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="buttons">
                        <h1>Create a new account.</h1>
                        <Link to="/signup">
                            <button className="btn btn-outline-secondary btn-lg">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
