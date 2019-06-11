const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const router = express.Router();
const userHelpers = require('./couchdb_api')

const key = "OCOpN93FYCbGlszCH8yu9CXvAHqcYHxh";

/*
    Log in an user
        String username : the name of the user
        String password : the password of the user
    @return -> JsonWebToken
 */
router.get('/authenticate/:username/:password', (req, res) => {
    var username = req.params.username
    var password = req.params.password

    if (!username || !password) {
        throw new Error(`Missing user or password value`);
    }

    console.log(`try to log in: username=${username} & password=${password}`)
    return userHelpers.getUser(username)
        .then((response) => {
            if (!response) {
                throw new Error(`${username} is not in DB`)
            }

            if (response && !comparePass(password, response.password)) {
                throw new Error(`Incorrect password for ${username}`)
            }
            // Creation of the JsonWebToken
            response["token"] = jwt.sign({sub: username}, key, {
                expiresIn: 604800
            });

            return response
        })
        .then((response) => {
            res.status(201).json({
                status: 'success',
                response
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                message: String(err),
            })
        })
})

/*
    Compare two passwords
        String userPassword : password entered by the user
        String databasePassword : password stored in the database
    @return -> boolean
 */
function comparePass (userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword)

}

/*
    Checks if an user is authenticated through its token in the header
         String username : name of the user
     @return -> success or error
 */
router.get('/authorization/:username', (req, res) => {
    var username = req.params.username
    if (req.headers['authorization'] === undefined || !req.headers['authorization'] || !username) {
        throw new Error(`Missing user or token value`);
    }
    return ensureAuthenticated(req)
        .then(() => {
            res.status(201).json({
                status: 'success'
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error',
                message: String(err)
            })
        })
})

/*
    Checks if an authentication token is still valid
        String token : jwt token
    @return -> boolean
 */
function ensureAuthenticated (req) {
    return new Promise((resolve, reject) => {
        var token = req.headers['authorization'].replace('Bearer ','');
        jwt.verify(token,key, function(err, decoded) {
            console.log(decoded)
            if (err) {
                console.log(err)
                reject(new Error(`Token for ${req.params.username} is not valid : ${token}`));
            } else resolve(true)
        });
    })
}

module.exports = router;
