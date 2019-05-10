const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();

const fields = ['summary','type','id','actor','object']

// The purpose of this service is to transform objects into activities and send them to the server inboxes

/*
    Creation of a create share activity by [actor] for [object] and send ton inbox
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
router.post('/create', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        console.log("Hello")
        return inboxApi.createShare(req)
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
    Creation of a remove share activity by [actor] for [object] and send ton inbox
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
router.post('/remove', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        return inboxApi.removeShare(req)
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
    Creation of an undo activity for the previous share activity by [actor] for [object]
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 4 || (!inboxApi.isActivity(req.body) && !fields.every(field => req.body.hasOwnProperty(field)))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        return inboxApi.undoShare(req)
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
