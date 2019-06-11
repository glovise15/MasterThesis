const express = require('express');
const inboxApi = require('./inbox_api');
const router = express.Router();
const noteQueryUrl = process.env.PREFIX+''+process.env.HOST+':'+process.env.NOTE_QUERY_PORT+"/note/get/";
const activityFields = ['type','actor','object', 'to'];
const objectFields = ['type', 'content', 'attributedTo', 'to'];
const supportedTypes = ['Create', 'Update', 'Delete'];

// The purpose of this service is to transform new objects into activities, if required, and send them to the server inboxes

/*
    Forward a create activity to the inbox (transform object into activity if required)
        Activity activity = ActivityStreams create activity
            OR
        Object object = ActivityStreams note object
    @return -> success or error
 */
router.post('/create', (req, res) => {
    if( req.body === undefined
        || Object.keys(req.body).length < 4
        || (req.body.type !== "Create" && req.body.type !== "Note")
        || (req.body.type === "Note" && !objectFields.every(field => req.body.hasOwnProperty(field)))
        || (req.body.type === "Create" && !activityFields.every(field => req.body.hasOwnProperty(field)))){

        return res.status(500).json({
            status: 'error',
            message: "Activity fields required : " + activityFields + " || Object fields required : "+ objectFields
        });
    }else{
        req.body = req.body.type === "Create" ? req.body : toActivity(req.body, "Create") ;
        return forwardRequest(req,res, 'create');
    }
});

/*
    Encapsulate an object into an activity
        Object object : the object to include in the activity
        String type : the type of activity (Create, Delete, Undo, ....)
    @return -> the new activity
 */
function toActivity(note, type){
    let identifier = note.attributedTo.split("/").pop()+'_'+Date.now();
    note.id = noteQueryUrl +''+identifier;
    return {
        "@context": note['@context'],
        type: type,
        actor: note.attributedTo,
        object: note,
        published : Date.now(),
        to: note.to,
        cc: note.cc,
        bto: note.bto,
        bcc: note.bcc,
        audience: note.audience

    };
}

/*
    Forward an update activity to the inbox
        String type : Update
        String actor : the author of the note
        Object object : the note object
        String to : recipient address
    @return -> success or error
 */
router.post('/update', (req, res) => {
    return handleRequest(req, res, 'update');
});

/*
    Forward a delete activity to the inbox
        String type : Delete
        String actor : the author of the note
        Object object : the note object
        String to : recipient address
    @return -> success or error
 */
router.post('/delete', (req, res) => {
    return handleRequest(req, res, 'delete');
});

/*
    Checks that a request is valid
        Request req : the request containing the activity
    @return -> boolean
 */
function isRequestValid(req){
    return !(req.body === undefined
        || Object.keys(req.body).length < 4
        || !supportedTypes.includes(req.body.type)
        || !activityFields.every(field => req.body.hasOwnProperty(field)));
}

/*
    Handles the activity verification and forwarding
        Request req : the request containing the activity
        Request res : the response
        String urn : create, update or delete
    @return -> success or error
 */
function handleRequest(req, res, urn){
    if(!isRequestValid(req)){
        return res.status(500).json({
            status: 'error',
            message: "Fields required: " + activityFields + " and incorrect type required: Create, Update or Delete"
        });
    }else return forwardRequest(req, res, urn);
}

/*
    Forward the activity to all recipients
        Request req : the request containing the activity
        Request res : the response
        String urn : create, update or delete
    @return -> success or error
 */
function forwardRequest(req, res, urn){
    let identifier = req.body.actor.split("/").pop()+'_'+Date.now();
    req.body.id = noteQueryUrl +''+identifier;
    return inboxApi.sendActivity(req,urn)
        .then((data) => {
            res.status(201).json({
                status: 'success',
                data
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: String(err)
            })
        })
}

module.exports = router;
