const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')
const supportedTypes = ['Like', 'Undo'];
const fields = ['type','id','actor','object','to']

/*
    Publish the create like  to the eventStore
        String summary : quick summary about the activity
        String id : unique url identifier
        String type : Like
        String actor : the liker actor
        String object : the object liked
        String to : recipient address
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the undo like to the eventStore
        String summary : quick summary about the activity
        String id : unique url identifier
        String type : Like
        String actor : the liker actor
        String object : the object liked
        String to : recipient address
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
    Publish a note activity to the eventStore
        Activity activity : the activity containing the note
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
        Activity activity : the activity containing the note
        Request res : request response
    @return -> success or error
 */
function forwardRequest(activity, res){
    return event_handler.publishLikeEvent(activity)
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
