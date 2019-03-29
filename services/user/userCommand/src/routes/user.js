const express = require('express');
const log = require('debug')('user-db')
const router = express.Router();
const userHelpers = require('./couchdb_api')


router.post('/', (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Username and password required'
        });
    }else{
        console.log(`try to add user :: username=${username}&password=${password}`)
        return userHelpers.createUser(req)
            .then((data) => {
                res.status(200).json({
                    status: 'success',
                    data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'error FD',
                    message: String(err)
                })
            })
    }


})



module.exports = router;
