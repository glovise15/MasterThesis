const express = require('express');

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
                status: 'error',
                message: String(err)
            })
        })
})

app.get('/user/authorization/:username/:token', (req, res) => {
    var username = req.params.username
    log(`checks wether the token of ${username} is valid`)
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
