const {
    User
} = require("../models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
//For encryption & decyption
const CryptoJS = require("crypto-js");

const createUser = async (req, res) => {
    console.log("Create Emp");

    const {
        email,
        password,
        fullName,
        mobileNumber,
        address,
        city,
        state,
        country,
        zipCode
    } = req.body;

    let statusCode;
    let message;

    try {
        let user = await User.findOne({
            email: email,
        });

        if (user) {
            //User is already present
            statusCode = 409;
            message = {
                message: "User already exists, try login instead",
            };
        } else {
            //create user
            //cipher = cipher.toString();
            user = new User({
                email: email,
                password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY),
            });

            if (fullName) {
                user.fullName = fullName;
            }

            if (email) {
                user.email = email;
            }

            if (mobileNumber) {
                user.mobileNumber = mobileNumber;
            }

            if (address) {
                user.address = address;
            }

            if (city) {
                user.city = city;
            }

            if (state) {
                user.state = state;
            }

            if (country) {
                user.country = country;
            }

            if (zipCode) {
                user.zipCode = zipCode;
            }

            await user.save();

            statusCode = 201;
            message = {
                message: "User created successfully",
            };
        }
    } catch (err) {
        console.log("Some error occured", err);
        statusCode = 400;
        message = {
            message: "Bad request, Try again",
        };
    }

    res.status(statusCode).send(message);
};

const loginUser = async (req, res) => {
    console.log("User Login");

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
            email: email,
        });

        if (user) {
            //decipher = decipher.toString(CryptoJS.enc.Utf8);
            if (
                user.email === email &&
                CryptoJS.AES.decrypt(user.password, KEY).toString(CryptoJS.enc.Utf8) ===
                password
            ) {
                token = jwt.sign({
                        username: email,
                    },
                    KEY
                );
                statusCode = 200;
                message = {
                    message: `Login successfull, Welcome ${user.email}`,
                    token,
                    email: user.email
                };
            } else {
                statusCode = 401;
                message = {
                    message: `Incorrect credentails, please try again`,
                };
            }
        } else {
            statusCode = 404;
            message = {
                message: `User doesn't exists, please register to login`,
            };
        }
    } catch (err) {
        console.log("Error occured: " + err);
        statusCode = 400;
        message = {
            message: "Bad Request, Try again",
        };
    }

    res.status(statusCode).send(message);
};

const updateUser = async (req, res) => {
    console.log("updating a user");
    let statusCode;
    let message;

    const id = req.params.email

    const {
        fullName,
        email,
        password,
        mobileNumber,
        address,
        city,
        state,
        country,
        zipCode,
    } = req.body;

    try {
        let user = await User.findOne({
            email: id,
        });

        if (fullName) {
            user.fullName = fullName;
        }

        if (email) {
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        if (mobileNumber) {
            user.mobileNumber = mobileNumber;
        }

        if (address) {
            user.address = address;
        }

        if (city) {
            user.city = city;
        }

        if (state) {
            user.state = state;
        }

        if (country) {
            user.country = country;
        }

        if (zipCode) {
            user.zipCode = zipCode;
        }

        await user.save();
        statusCode = 200;
        message = {
            message: "Details updated",
            email: user.email
        };
    } catch (err) {
        console.log("Error occured: ", err);
        statusCode = 400;
        message = {
            message: "Bad request, Try Again"
        };
    }

    res.status(statusCode).send(message);
};

const getUser = async (req, res) => {
    console.log("getting user");
    let statusCode;
    let message;

    const id = req.params.email //localhost:3128/user/yash@gmail.com
    console.log("id", id)

    try {
        message = await User.find({
            email: id,
        });

        statusCode = 200;

    } catch (err) {
        console.log("Error occured: ", err);
        statusCode = 400;
        message = "Bad request, Try Again";
    }

    if (message.length === 0) {
        statusCode = 400;
        message = {
            message: "Bad request, Try Again"
        }
    } else {
        message = {
            user: message.map((user) => ({
                email: user.email,
                fullName: user.fullName,
                mobileNumber: user.mobileNumber,
                address: user.address,
                city: user.city,
                state: user.state,
                country: user.country,
                zipCode: user.zipCode,
            }))
        }
    }

    res.status(statusCode).send(message);
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser
};