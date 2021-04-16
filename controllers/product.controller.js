const {
    Product
} = require('../models')

const createProduct = async (req, res) => {
    let statusCode;
    let message;

    const {
        id,
        name,
        description,
        imageLink,
        extraImages,
        price,
        category,
        discount
    } = req.body

    try {
        const product = new Product({
            id,
            name,
            description,
            imageLink,
            extraImages,
            price,
            category,
        })

        if (discount) {
            product.discount = discount
        }

        await product.save();
        statusCode = 200
        message = {
            message: 'Product added successfully'
        }
    } catch (err) {
        console.log('Some error occured', err)
        statusCode = 400
        message = {
            message: 'Bad request, Try again'
        }
    }

    res.status(statusCode).send(message)
}

const createBulkProducts = async (req, res) => {
    let statusCode;
    let message;

    let {
        myProducts
    } = req.body

    try {
        await Product.insertMany(myProducts)

        statusCode = 200
        message = {
            message: 'Products added successfully'
        }
    } catch (err) {
        console.log('Some error occured', err)
        statusCode = 400
        message = {
            message: 'Bad request, Try again'
        }
    }

    res.status(statusCode).send(message)
}

const getProducts = async (req, res) => {
    let statusCode;
    let message;

    let { //localhost:3128/?searchKey=mint&category=eggless
        searchKey,
        category,
        id
    } = req.query;

    try {
        if (searchKey && category && id) {
            message = await Product.find({
                name: {
                    $regex: `${searchKey}`,
                    $options: "gi"
                },
                category: {
                    $regex: `${category}`,
                    $options: "gi"
                },
                id: id
            })
        } else if (searchKey) {
            message = await Product.find({
                name: {
                    $regex: `${searchKey}`,
                    $options: "gi"
                }
            })
        } else if (category) {
            message = await Product.find({
                category: {
                    $regex: `${category}`,
                    $options: "gi"
                }
            })
        } else if (id) {
            message = await Product.find({
                id: id
            })
        } else {
            message = await Product.find({})
        }
        statusCode = 200
    } catch (err) {
        console.log('Some error occured', err)
        statusCode = 400
        message = {
            message: 'Bad request, Try again'
        }
    }

    if (message.length === 0) {
        statusCode = 404
        message = {
            message: 'Products not found'
        }
    } else {
        message = {
            products: message.map((product) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                imageLink: product.imageLink,
                price: product.price,
                category: product.category,
                discount: product.discount
            }))
        }
    }

    res.status(statusCode).send(message)
}

module.exports = {
    createProduct,
    createBulkProducts,
    getProducts,
}