const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();

const fields = ['summary','type','id','subject','relationship','object']

// The purpose of this service is to transform objects into activities and send them to the server inboxes

/*
    Creation of a block relationship activity between a subject and object (does nothing if the request already contains an activity)
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the blocker actor
        String relationship : type of the relationship (Block)
        String object : the blocked actor
    @return -> success or error
 */
router.post('/create', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        return inboxApi.createBlock(req)
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
    Removal of a block relationship activity between a subject and object (does nothing if the request already contains an activity)
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the blocker actor
        String relationship : type of the relationship (Block)
        String object : the blocked actor
    @return -> success or error
 */
router.post('/remove', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        return inboxApi.removeBlock(req)
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
    Undo of a block relationship activity between a subject and object (does nothing if the request already contains an activity)
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the blocker actor
        String relationship : type of the relationship (Block)
        String object : the blocked actor
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        return inboxApi.undoBlock(req)
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
