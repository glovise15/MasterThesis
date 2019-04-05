const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

router.post('/create', (req, res) => {
    let username = req.body.username
    let actorname = req.body.actorname
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Username and actorname required'
        });
    }else{
        console.log(`try to add actor :: username=${username}&actorname=${actorname}`)
        return actorHelpers.createActor(req)
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
    }


})


router.post('/update', (req, res) => {
    let username = req.body.username
    let actorname = req.body.actorname
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Username and actorname required'
        });
    }else{
        console.log(`try to update actor :: username=${username}&actorname=${actorname}`)
        return actorHelpers.updateActor(req)
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
    }


})


router.post('/remove', (req, res) => {
    let actorname = req.body.actorname
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname required'
        });
    }else{
        console.log(`try to remove actor :: actorname=${actorname}`)
        return actorHelpers.removeActor(req)
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
    }


})

// POST /actor/create
// POST /actor/update
// POST /actor/delete

module.exports = router;
