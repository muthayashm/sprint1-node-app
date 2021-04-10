const {
    User
} = require('../models');

const createUser = async (req, res) => {
    console.log('Create Emp');

    const {
        email,
        password
    } = req.body

    let statusCode;
    let message;

    try {
        const user = new User({
            email: email,
            password: password
        })
        await user.save()
        statusCode = 200
        message = {
            message: 'User created successfully'
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

module.exports = {
    createUser
}