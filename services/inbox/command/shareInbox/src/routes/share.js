const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')

router.get('/create', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and share create activity required'
        });
    }else{
        console.log(`try to create share for :: actorname=${actorname}`)
        return event_handler.publishShareEvent(req)
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
            message: 'Actorname and share update activity required'
        });
    }else{
        console.log(`try to update share for :: actorname=${actorname}`)
        return event_handler.publishShareEvent(req)
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
            message: 'Actorname and share remove activity required'
        });
    }else{
        console.log(`try to remove share for :: actorname=${actorname}`)
        return event_handler.publishShareEvent(req)
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
            message: 'Actorname and share undo activity required'
        });
    }else{
        console.log(`try to undo share for :: actorname=${actorname}`)
        return event_handler.publishShareEvent(req)
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
