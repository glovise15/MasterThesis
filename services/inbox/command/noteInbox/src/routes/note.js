const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')
const supportedTypes = ['Create', 'Update', 'Delete'];
const fields = ['type','id','actor','object', 'to'];

/*
    Publish the create note  to the eventStore
        String type : Create
        String id : unique url identifier
        String actor : the author of the note
        Object object : the note object
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the update note  to the eventStore
        String type : Update
        String id : unique url identifier
        String actor : the author of the note
        Object object : the note object
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/update', (req, res) => {
    return publish(req.body,res)
});


/*
    Publish the delete note  to the eventStore
        String type : Delete
        String id : unique url identifier
        String actor : the author of the note
        Object object : the note object
        String to : recipient address
        String summary : quick summary about the activity
    @return -> success or error
 */
router.post('/delete', (req, res) => {
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
    return event_handler.publishNoteEvent(activity)
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
