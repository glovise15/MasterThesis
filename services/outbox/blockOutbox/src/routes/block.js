const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();
const fields = ['summary','type','actor','object', 'to'];
const supportedTypes = ['Block', 'Undo'];
const blockQueryUrl = process.env.PREFIX+''+process.env.HOST+':'+process.env.BLOCK_QUERY_PORT+"/block/get/";

// The purpose of this service is send block activities the appropriate inboxes

/*
    Forward a block activity to the inbox
        String summary : quick summary about the activity
        String type : Block
        String actor : the blocker actor
        String object : the blocked actor
        String to : recipient address
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return handleRequest(req, res, 'create');
});

/*
    Undo of a block activity between an actor and object
        String summary : quick summary about the activity
        String type : Block
        String actor : the blocker actor
        String object : the blocked actor
        String to : recipient address
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    return handleRequest(req, res, 'undo');
});

/*
    Checks that a request is valid
        Request req : the request containing the activity
    @return -> boolean
 */
function isRequestValid(req){
    return !(req.body === undefined
        || Object.keys(req.body).length < 5
        || !supportedTypes.includes(req.body.type)
        || !fields.every(field => req.body.hasOwnProperty(field)));
}

/*
    Handles the activity verification and forwarding
        Request req : the request containing the activity
        Request res : the response
        String urn : create or undo
    @return -> success or error
 */
function handleRequest(req, res, urn){
    if(!isRequestValid(req)){
        return res.status(500).json({
            status: 'error',
            message: "Fields missing  (" + fields + ") or incorrect activity type (should be Block or Undo)"
        });
    }else{
        let identifier = req.body.actor.split("/").pop()+'_'+Date.now();
        req.body.id = blockQueryUrl +''+identifier;
        return forwardRequest(req, res, urn);
    }
}

/*
    Forward the activity to all recipients
        Request req : the request containing the activity
        Request res : the response
        String urn : create or undo
    @return -> success or error
 */
function forwardRequest(req, res, urn){
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
