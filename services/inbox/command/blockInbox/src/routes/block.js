const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')

router.get('/create', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and block create activity required'
        });
    }else{
        console.log(`try to create block for :: actorname=${actorname}`)
        return event_handler.publishBlockEvent(req)
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

router.get('/update', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and block update activity required'
        });
    }else{
        console.log(`try to update block for :: actorname=${actorname}`)
        return event_handler.publishBlockEvent(req)
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

router.get('/remove', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and block remove activity required'
        });
    }else{
        console.log(`try to remove block for :: actorname=${actorname}`)
        return event_handler.publishBlockEvent(req)
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

router.get('/undo', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and block undo activity required'
        });
    }else{
        console.log(`try to undo block for :: actorname=${actorname}`)
        return event_handler.publishBlockEvent(req)
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
