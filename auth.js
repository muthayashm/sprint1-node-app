const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const auth = (req, res, next) => {
    if (req.headers) {
        //console.log(req.headers)
        if (req.headers.authorization) {
            const [bearer, token] = req.headers.authorization.split(" ")
            const KEY = process.env.SECRET_KEY;
            jwt.verify(token, KEY, function (err, decoded) {
                if (err) {
                    console.log(`Error verifying the token ${err}`);
                    res.status(400).send({
                        message: 'Error verifying the token'
                    });
                } else {
                    if (decoded['username']) {
                        req.username = decoded['username']
                        next()
                    }
                }
            })
        } else {
            res.status(401).send({
                message: 'Unauthorized access'
            });
        }
    }
}

module.exports = {
    auth
}