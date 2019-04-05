const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

router.get('/all/:username', (req, res) => {
    let username = req.params.username
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Username required'
        });
    }else{
        console.log(`try to retrieve all actors where :: username=${username}`)
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
    }


})

router.get('/:actorname', (req, res) => {
    let actorname = req.params.actorname
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname required'
        });
    }else{
        console.log(`try to retrieve actor where :: actorname=${actorname}`)
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
    }


})




module.exports = router;
