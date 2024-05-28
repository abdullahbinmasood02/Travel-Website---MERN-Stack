import React from 'react'; // Import React at the beginning
import './Login.css'; // Import CSS file if needed

const Login = () => {
    return (
        <div className="login">
            <head> {/* This should be inside the <div> */}
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
                <title>Login</title>
            </head>
            <body> {/* This should be inside the <div> */}
                <div className="container">

                    <h1 className="text-center mb-4">Login</h1>

                    <form id="contact-form" method="post" action="Search.html">

                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-lg btn-outline-secondary">login</button>
                        </div>

                    </form>

                    <p className="text-center mt-3">Don't have an account? <a href="SignUp.html">Sign-up here</a></p>

                </div>
            </body>
        </div>
    );
};

export default Login; // Make sure the component name is capitalized and export it
