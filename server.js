require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const UserModel = require('./models/users');
const AgencyModel = require('./models/TravelAgency');
const SupportModel = require('./models/support'); // Import SupportModel
const BookingModel = require('./models/bookings'); // Import BookingModel
const ReviewModel= require('./models/ReviewModel')
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);


// Add endpoint to handle support requests
app.post("/support", async (req, res) => {
    try {
        const { username,email,message } = req.body; // Retrieve username, email, and message from the request body
        const newSupport = new SupportModel({ username, email, message }); // Create a new instance of the SupportModel
        console.log(req.body); // Log the request body for debugging purposes
        await newSupport.save(); // Save the new support request to the database
        res.json(newSupport); // Respond with the newly created support request
    } catch (error) {
        console.error("Error submitting support:", error);
        res.status(500).json({ error: "Failed to submit support request. Please try again later." });
    }
});

app.post("/customizedTrip", async (req, res) => {
    try {
        const { name, service, location, price, description } = req.body;
        const newBooking = new BookingModel({ name, service, location, price, description });
        await newBooking.save();
        res.json(newBooking);
    } catch (error) {
        console.error("Error creating customized trip:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/reviews", async (req, res) => {
    try {
        const { username, service, location, price, review } = req.body;
        const newReview = new ReviewModel({ username, service, location, price, review });
        await newReview.save();
        res.json(newReview);
    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ error: "Failed to submit review. Please try again later." });
    }
});

// Endpoint to fetch reviews for a specific user
app.get("/reviews", async (req, res) => {
    try {
        const { username } = req.query; // Fetch username from the request query
        const reviews = await ReviewModel.find({ username }); // Find reviews matching the username
        res.json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const jwt = require('jsonwebtoken');

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email, password });
        if (user) {
            const userId = user._id;
            const token = jwt.sign({ userId }, process.env.JWT_SECRET); // Use process.env.JWT_SECRET as secret key
            res.json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/search", async (req, res) => {
    try {
        const agencies = await AgencyModel.find({});
        res.json(agencies);
    } catch (error) {
        console.error("Error fetching travel agencies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/signup", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

// Add endpoint to handle bookings
app.post("/bookings", async (req, res) => {
    try {
        const booking = req.body;
        const newBooking = new BookingModel(booking);
        await newBooking.save();
        res.json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add endpoint to fetch bookings for a specific user
app.get("/bookings", async (req, res) => {
    const { name } = req.query;
    try {
        const bookings = await BookingModel.find({ name });
        res.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Add endpoint to delete a booking
app.delete("/bookings/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await BookingModel.findByIdAndDelete(id);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("Server listening at port 3000");
});
