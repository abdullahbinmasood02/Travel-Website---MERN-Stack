const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    
    username: {
        type: String,
        required: true
    },
    service: {
        type: String, 
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    
    review: {
        type: String,
        required: true
    }
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
