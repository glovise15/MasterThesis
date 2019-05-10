const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

router.get('/getAll/:user', (req, res) => {
    console.log(req.params)
    return actorHelpers.getAll(req)
        .then((data) => {
            res.status(200).json({
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



})

router.get('/get/:id', (req, res) => {

    return actorHelpers.get(req)
        .then((data) => {
            res.status(200).json({
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



})




module.exports = router;
