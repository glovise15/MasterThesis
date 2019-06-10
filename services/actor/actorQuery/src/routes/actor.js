const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

/*
    Get all the actors identities of a user
        String user : the identifier of the user
    @return -> array of actors
 */
router.get('/getAll/:user', (req, res) => {
    return actorHelpers.getAll(req.params.user)
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



});

/*
    Get the profile of an actor
        String id : the identifier of the actor
 */
router.get('/get/:id', (req, res) => {
    return actorHelpers.get(req.params.id)
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



});




module.exports = router;
