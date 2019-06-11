const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')
const supportedTypes = ['Block', 'Undo'];
const fields = ['type','id','actor','object','to']

/*
    Publish the create block relationship to the eventStore
        String type : Block
        String id : unique url identifier
        String actor : the actor performing the block
        String object : the blocked actor
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req.body,res)
});


/*
    Publish the delete block relationship to the eventStore
        String type : Undo
        String id : unique url identifier
        String actor : the actor performing the block
        String object : the blocked actor
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    return publish(req.body,res)
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
    Publish a block activity to the eventStore
        Activity activity : the activity containing the block
        Response res : request response
    @return -> success or error
 */
function publish(activity, res){
    if(!isActivityValid(activity)){
        return res.status(500).json({
            status: 'error',
            message: "Fields missing (" + fields + ") or incorrect activity type ("+supportedTypes+")"
        });
    }else return forwardRequest(activity, res);
}

/*
    Forward the activity to all recipients
        Activity activity : the activity containing the block
        Request res : request response
    @return -> success or error
 */
function forwardRequest(activity, res){
    return event_handler.publishBlockEvent(activity)
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

module.exports = router;
