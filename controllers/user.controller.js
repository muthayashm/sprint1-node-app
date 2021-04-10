const {
    User
} = require('../models');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

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

const loginUser = async (req, res) => {
    console.log('User Login')

    let statusCode;
    let message;
    let user;

    const {
        email,
        password
    } = req.body;

    const KEY = process.env.SECRET_KEY;

    try {
        user = await User.findOne({
            email: email
        })

        if (user) {
            if (user.email === email && user.password === password) {
                token = jwt.sign({
                    username: email
                }, KEY)
                statusCode = 200
                message = {
                    message: `Login successfull, Welcome ${user.email}`,
                    token
                }
            } else {
                statusCode = 401
                message = {
                    message: `Incorrect credentails, please try again`
                }
            }
        } else {
            statusCode = 404
            message = {
                message: `User doesn't exists, please register to login`
            }
        }
    } catch (err) {
        console.log('Error occured: ' + err)
        statusCode = 400
        message = {
            message: 'Bad Request, Try again'
        }
    }

    res.status(statusCode).send(message)
}

module.exports = {
    createUser,
    loginUser
}