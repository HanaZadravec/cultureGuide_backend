const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },   
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    }});

module.exports = mongoose.model("User", UserSchema);