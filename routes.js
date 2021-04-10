//Importing the libraries
const express = require('express')
const router = express.Router();
const userController = require('./controllers/user.controller');

router.post('/', userController.createUser) //localhost:3128/user

//Route configuration
const routes = (app) => {
    app.use('/user', router);

    app.get('/', (req, res) => {
        return res.send({
            message: `Welcome to SweetCheery's API`
        })
    })
}

//Exporting routes
module.exports = routes