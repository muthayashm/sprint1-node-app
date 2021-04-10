//Importing the libraries
const express = require('express')
const router = express.Router();
const userController = require('./controllers/user.controller');
const {
    auth
} = require('./auth')

router.post('/', userController.createUser) //localhost:3128/user

//Route configuration
const routes = (app) => {
    app.use('/user', router);

    app.post('/login', userController.loginUser)

    app.get('/auth', auth, (req, res) => {
        //console.log(res)
        res.status(200).send({
            message: 'Token Validated, Welcome User'
        })
    })

    app.get('/', (req, res) => {
        return res.send({
            message: `Welcome to SweetCheery's API`
        })
    })
}

//Exporting routes
module.exports = routes