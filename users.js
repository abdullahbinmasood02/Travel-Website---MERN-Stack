const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, // Corrected typo from 'tpe' to 'type'
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Corrected variable name from UserSchema to userSchema
const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
