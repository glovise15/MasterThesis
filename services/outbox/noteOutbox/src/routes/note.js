const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();

const fields = ['name','type','id','actor','content']

// The purpose of this service is to transform objects into activities and send them to the server inboxes

/*
    Creation of a create note activity by [actor] and send to inbox
        String name : title of the note
        String type : Note
        String id : unique identifier
        String actor : the author of the note
        String content : the text of the note
    @return -> success or error
 */
router.post('/create', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
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

/*
    Creation of a update note activity by [actor] and send to inbox
        String name : title of the note
        String type : Note
        String id : unique identifier
        String actor : the author of the note
        String content : the text of the note
    @return -> success or error
 */
router.post('/update', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
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

/*
    Creation of a remove note activity by [actor] and send to inbox
        String name : title of the note
        String type : Note
        String id : unique identifier
        String actor : the author of the note
        String content : the text of the note
    @return -> success or error
 */
router.post('/remove', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
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


/*
    Creation of a undo note activity by [actor] and send to inbox
        String name : title of the note
        String type : Note
        String id : unique identifier
        String actor : the author of the note
        String content : the text of the note
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
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
