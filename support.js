const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supportSchema = new Schema({
    // Change 'name' to 'username'
    username: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    message: {
        type: String,
        required: true,
    },
});

// Corrected variable name from UserSchema to userSchema
const supportModel = mongoose.model("support", supportSchema);

module.exports = supportModel;
