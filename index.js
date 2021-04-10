//Importing the libraries
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

//Importing local files
const routes = require('./routes')

//Getting properties from .env file
const PORT = process.env.PORT;
const DB_URL = process.env.MONGO_URL;

//Initializing app
const app = express()

//Setting up app configurations
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

routes(app)

//Connecting MongoDB
mongoose.connect(DB_URL, {
    useNewUrlParser: true
});

app.listen(PORT, () => {
    console.log('SweetCherry\'s Server running on PORT: ' + PORT)
})