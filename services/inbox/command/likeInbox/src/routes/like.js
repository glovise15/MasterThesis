const express = require('express');
const router = express.Router();
const event_handler = require('./event_handler')

const fields = ['type','id','actor','object']

/*
    Publish the create like  to the eventStore
        String type : type of activity (Create)
        String id : unique identifier
        String actor : the actor performing the like
        String object : the  object
    @return -> success or error
 */
router.post('/create', (req, res) => {
    return publish(req.body,res)
});


/*
    Publish the remove like  to the eventStore
        String type : type of activity (Remove)
        String id : unique identifier
        String actor : the actor performing the like
        String object : the  object
    @return -> success or error
 */
router.post('/remove', (req, res) => {
    return publish(req.body,res)
});

/*
    Publish the undo like  to the eventStore
        String type : type of activity (Undo)
        String id : unique identifier
        String actor : the actor performing the like
        String object : the  object
    @return -> success or error
 */
router.post('/undo', (req, res) => {
    return publish(req.body,res)
});

/*
        Publish a like activity to the eventStore
            Object activity : like  activity
            Object res : request result
 */
function publish(activity, res){
    console.log(activity)
    if(activity === undefined || Object.keys(activity).length < 4 || !fields.every(field => activity.hasOwnProperty(field))){
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        console.log(`try to create like for :: actorname=${activity.actor}`)
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
}

module.exports = router;
