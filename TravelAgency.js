const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AgencySchema = new Schema({
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

    description: {
        type: String,
        required: true,
    }
});

// Corrected variable name from UserSchema to userSchema
const AgencyModel = mongoose.model("agencies", AgencySchema);

module.exports = AgencyModel;
