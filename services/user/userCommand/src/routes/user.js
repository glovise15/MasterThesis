const express = require('express');
const log = require('debug')('user-db')
const router = express.Router();
const userHelpers = require('./couchdb_api')


router.post('/', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    console.log(`try to add user :: username=${username}&password=${password}`)
    return userHelpers.createUser(req)
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
