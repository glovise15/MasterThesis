const express = require('express');
const log = require('debug')('user-db')
const router = express.Router();
const userHelpers = require('./couchdb_api')

const fields = ['username', 'password'];

/*
    Register a new user
        String username : the name of the new user
        String password : the password of the new user
    @return -> success or error
 */
router.post('/create', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 2 || !fields.every(field => req.body.hasOwnProperty(field))){
        return res.status(500).json({
            status: 'error',
            message: 'Fields required : username, password'
        });
    }else{
        // Insert into the database
        return userHelpers.createUser(req)
            .then((data) => {
                res.status(201).json({
                    status: 'success',
                    data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    status: 'error',
                    message: String(err)
                })
            })
    }


})



module.exports = router;
