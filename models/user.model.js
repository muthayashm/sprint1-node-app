//Importing libraries
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    uniqueCaseInsensitive: false
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    zipCode: {
        type: Number,
        required: false
    },
    lastLoginOn: {
        type: Date,
        required: false
    }
}, {
    timestamps: true
})

//exporting model
module.exports = mongoose.model('User', User)