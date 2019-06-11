const express = require('express');
const request = require('request');
const router = express.Router();
const event_handler = require('./event_handler')
const supportedTypes = ['Follow', 'Undo', 'Accept','Reject'];
const fields = ['type','id','actor','object']

/*
    Publish the create follow relationship to the eventStore
        String type : Block
        String id : unique identifier
        String actor : the actor performing the block
        String object : the blocked actor
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req,res)
});

/*
    Publish the undo follow relationship to the eventStore
        String summary : quick summary about the relationship
        String type : Undo
        String actor : the follower actor
        String object : the followed actor
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    return publish(req,res)
});

/*
    Publish the accept follow relationship to the eventStore
        String type : Accept
        String actor : the followed actor
        String object : the follow activity
        String to : the following address
    @return -> success or error
 */
router.post('/accept', (req, res) => {
    return publish(req,res)
});

/*
    Publish the reject follow relationship to the eventStore
        String type : Accept
        String actor : the followed actor
        String object : the follow activity
        String to : the following address
    @return -> success or error
 */
router.post('/reject', (req, res) => {

    return publish(req,res)
});

/*
    Checks that an activity is valid
        Request req : the request containing the activity
    @return -> boolean
 */
function isActivityValid(activity){
    return !(activity === undefined
        || Object.keys(activity).length < 5
        || !supportedTypes.includes(activity.type)
        || !fields.every(field => activity.hasOwnProperty(field)));
}

/*
    Publish a follow activity to the eventStore
        Activity activity : the follow activity
        Response res : request response
    @return -> success or error
 */
function publish(req, res){
    if(!isActivityValid(req.body)){
        return res.status(500).json({
            status: 'error',
            message: "Fields missing (" + fields + ") or incorrect activity type ("+supportedTypes+")"
        });
    }
    if(req.body.type !== 'Follow') return forwardRequest(req.body, res, null);

    let approvalActivity = {
        "@context": "https://www.w3.org/ns/activitystreams",
        type: "Accept",
        actor: req.body.actor,
        object: req.body
    };

    isNotblocked(req)
        .then((data) => {
            if (data.blocked.includes(req.body.actor)) {

                return res.status(500).json({
                    status: 'error',
                    message: req.body.actor + " is not allowed to follow " + req.body.object
                 })
            }
            return forwardRequest(req.body, res, approvalActivity);
        })
        .catch((err) => {
             return forwardRequest(req.body, res, approvalActivity);
        });
}

/*
    Forward the activity to all recipients
        Activity activity : the follow activity
        Request res : request response
    @return -> success or error
 */
function forwardRequest(followActivity, res, approvalActivity){
    return event_handler.publishFollowEvent(followActivity, approvalActivity)
        .then((data) => {
            res.status(201).json({
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

/*
    Verifies that the follow request is acceptable
        Activity activity : the follow activity
    @return -> promise
 */
function isNotblocked(req){
    let array = req.body.object.split("/");
    let object = array[array.length-1];
    return new Promise((resolve, reject) => {
        request.get({
            headers: {"Content-Type": 'application/json', Authorization: req.headers.authorization},
            url: process.env.PREFIX+''+process.env.HOST+':'+process.env.BLOCK_QUERY_PORT+"/block/blocked/"+object ,
            json: true
        }, function (error, response, body){
            if (!error ) resolve(body);
            else reject(error ? error : "incorrect get url : "+location)
        });
    });
}


module.exports = router;
