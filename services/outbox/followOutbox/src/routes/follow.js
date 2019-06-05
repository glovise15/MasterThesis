const express = require('express');
const inboxApi = require('./inbox_api')
const router = express.Router();
const fields = ['summary','type','actor','object', 'to'];
const supportedTypes = ['Follow', 'Undo'];
const followQueryUrl = 'http://172.25.0.1:3113/follow/get/';

// The purpose of this service is send follow activities the appropriate inboxes

/*
    Forward a follow activity to the inbox
        String summary : quick summary about the relationship
        String type : Follow
        String actor : the follower actor
        String object : the followed actor
        String to : recipient address
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return handleRequest(req, res, 'create');
});

/*
    Undo of a previous follow activity between an actor and object
        String summary : quick summary about the relationship
        String urn : Undo
        String actor : the follower actor
        String object : the follow activity
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
            message: "Fields missing  (" + fields + ") or incorrect activity type (should be Follow or Undo)"
        });
    }else{
        let identifier = req.body.actor.split("/").pop()+'_'+Date.now();
        req.body.id = followQueryUrl +''+identifier;
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

module.exports = router;
