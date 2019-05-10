const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')

const fields = ['type','id','actor','object']

/*
    Publish the create follow relationship to the eventStore
        String type : type of activity (Create)
        String id : unique identifier
        String actor : the follower actor
        String object : the relationship object
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req.body,res)
});


/*
    Publish the remove follow relationship to the eventStore
        String type : type of activity (Remove)
        String id : unique identifier
        String actor : the follower actor
        String object : the relationship object
    @return -> success or error
 */
router.post('/remove', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the accept follow relationship to the eventStore
        String type : type of activity (Accept)
        String id : unique identifier
        String actor : the follower actor
        String object : the relationship object
    @return -> success or error
 */
router.post('/accept', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the reject follow relationship to the eventStore
        String type : type of activity (Remove)
        String id : unique identifier
        String actor : the follower actor
        String object : the relationship object
    @return -> success or error
 */
router.post('/reject', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the undo follow relationship to the eventStore
        String type : type of activity (Undo)
        String id : unique identifier
        String actor : the follower actor
        String object : the relationship object
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    return publish(req.body,res)
});

/*
        Publish a follow activity to the eventStore
            Object activity : follow relationship activity
            Object res : request result
 */
function publish(activity, res){
    if(activity === undefined || Object.keys(activity).length < 4 || !fields.every(field => activity.hasOwnProperty(field))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        console.log(`try to create follow for :: actorname=${activity.actor}`)
        return event_handler.publishFollowEvent(activity)
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
}

module.exports = router;
