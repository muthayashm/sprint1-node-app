//Importing libraries
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

//exporting model
module.exports = mongoose.model('User', User)