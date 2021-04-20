//Importing libraries
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uniqueCaseInsensitive: false,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    fullName: {
        type: String,
        required: false,
        default: ''
    },
    mobileNumber: {
        type: Number,
        required: false,
        default: 0.0
    },
    address: {
        type: String,
        required: false,
        default: ''
    },
    city: {
        type: String,
        required: false,
        default: ''
    },
    state: {
        type: String,
        required: false,
        default: ''
    },
    country: {
        type: String,
        required: false,
        default: ''
    },
    zipCode: {
        type: Number,
        required: false,
        default: 0.0
    },
    lastLoginOn: {
        type: Date,
        required: false,
        default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
    }
}, {
    timestamps: true
})

//exporting model
module.exports = mongoose.model('User', User)