const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userHelpers = require('./couchdb_api')

router.get('', (req, res) => {
    console.log("LOBBY")

    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service user',
        object
    })
});

//LOGIN
router.get('/:username/:password', (req, res) => {
    console.log("GETTER")
    var username = req.params.username
    var password = req.params.password
    console.log(`try to log in: username=${username} & password=${password}`)
    return userHelpers.getUser(username)
        .then((response) => {
            if (!response) {
                throw new Error(`${username} is not in DB`)
            }

            if (response && !userHelpers.comparePass(password, response.password)) {
                throw new Error(`Incorrect password for ${username}`)
            }

            response["token"] = jwt.sign({username:username}, userHelpers.key, {
                expiresIn: 604800
            });

            return response
        })
        .then((response) => {
            res.status(200).json({
                status: 'success',
                response
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 'error found',
                message: String(err),
            })
        })
})

router.get('/authorization/:username/:token', (req, res) => {
    var username = req.params.username
    console.log(`checks wether the token of ${username} is valid`)
    return userHelpers.ensureAuthenticated(req)
        .then(() => {
            res.status(200).json({
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

module.exports = router;
