//Importing the libraries
const express = require('express')
const userRouter = express.Router();
const productRouter = express.Router();

const userController = require('./controllers/user.controller');
const productController = require('./controllers/product.controller')

const {
    auth
} = require('./auth')

userRouter.post('/', userController.createUser) //localhost:3128/user

productRouter.post('/', productController.createProduct)
productRouter.post('/bulk', productController.createBulkProducts)
productRouter.get('/', productController.getProducts)

//Route configuration
const routes = (app) => {
    app.use('/user', userRouter);

    app.use('/product', productRouter);

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