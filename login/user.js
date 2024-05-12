const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex // This will validate the email format
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('user', UserSchema);

