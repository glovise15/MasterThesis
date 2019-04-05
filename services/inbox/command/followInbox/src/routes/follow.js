const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')

router.get('/create', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and follow create activity required'
        });
    }else{
        console.log(`try to create follow for :: actorname=${actorname}`)
        return event_handler.publishFollowEvent(req)
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
            message: 'Actorname and follow update activity required'
        });
    }else{
        console.log(`try to update follow for :: actorname=${actorname}`)
        return event_handler.publishFollowEvent(req)
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
            message: 'Actorname and follow remove activity required'
        });
    }else{
        console.log(`try to remove follow for :: actorname=${actorname}`)
        return event_handler.publishFollowEvent(req)
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
            message: 'Actorname and follow undo activity required'
        });
    }else{
        console.log(`try to undo follow for :: actorname=${actorname}`)
        return event_handler.publishFollowEvent(req)
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
