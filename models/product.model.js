//Importing libraries
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Product = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    extraImages: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: false
    },
    isNewProduct: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
})

//exporting model
module.exports = mongoose.model('Product', Product)