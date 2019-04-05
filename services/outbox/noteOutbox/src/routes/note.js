const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();

router.post('/create', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and note create activity required'
        });
    }else{
        console.log(`try to create note for :: actorname=${actorname}`)
        return inboxApi.createNote(req)
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
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and note update activity required'
        });
    }else{
        console.log(`try to update note for :: actorname=${actorname}`)
        return inboxApi.updateNote(req)
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
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and note remove activity required'
        });
    }else{
        console.log(`try to remove note for :: actorname=${actorname}`)
        return inboxApi.removeNote(req)
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

router.post('/undo', (req, res) => {
    let actorname = req.body.actorname
    let activity = req.body.activity
    if(req.body === undefined || !Object.keys(req.body).length){
        return res.status(500).json({
            status: 'error',
            message: 'Actorname and note undo activity required'
        });
    }else{
        console.log(`try to undo note for :: actorname=${actorname}`)
        return inboxApi.undoNote(req)
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
