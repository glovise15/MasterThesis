const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.ACTOR_QUERY_PORT+"/actor/get/";
const followHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.FOLLOW_QUERY_PORT+"/follow/get/";


/*
    Subscription to the follow topic
 */
wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'followed'}
    }).
    received((event, cancel) => {
        /*
            This is where we can handle the received event and eventually forward it to a database or other service such as the front end
         */
        console.log("Event received : " + event.data.type);
    });
})
.catch((err) => {
    console.log(err)
});

/*
    Retrieve all the followers of [actor]
        String actor : id of an actor
    @return -> array of followers
 */
router.get('/followed/:actor', (req, res) => {
    console.log(actorHost+""+req.params.actor);
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Follow" }},
                            { 'activity.object' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.object' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Accept" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.object' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Reject" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.object' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    }

                ]

            },
            orderBy: { 'timestamp': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            let followers = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayFollow(array);
                if (replayedEvent != null) followers.push(replayedEvent.actor);
            });
            if(followers === undefined || followers < 1) {
                let err = "No followers found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    followers
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve all actors that [actor] follows
        String actor : id of an actor
    @return -> array of followers
 */
router.get('/following/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Follow" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Accept" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Reject" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    }

                ]

            },
            orderBy: { 'timestamp': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            let following = [];
            groupById(events).forEach(array => {
               let replayedEvent = replayFollow(array);
               if (replayedEvent != null) following.push(replayedEvent.object);
            });
            if(following === undefined || following < 1) {
                let err = "No following found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    following
                });
            }
        });
    })
    .catch((err) => {
        console.log(err)
    });
});

/*
    Retrieve a follow activity
        String object : id of a follow activity
    @return -> follow activity
 */
router.get('/get/:object', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Follow" }},
                            { 'activity.id' : { $contains: followHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.id' : { $contains: followHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Accept" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.id' : { $contains: followHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Reject" }},
                            { 'activity.object.type': { $contains: "Follow" }},
                            { 'activity.object.id' : { $contains: followHost+""+req.params.object }}
                        ]
                    }

                ]

            },
            orderBy: { 'timestamp': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            if(!Array.isArray(events)) return events.activity;
            let follow = replayFollow(events);
            if(follow === undefined || follow < 1) {
                let err = "No activity found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    follow
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });
});

/*
    Split an array of follow events into an array of array for each sequence of event relative to the same object
        Array events : array of follow events
    @return -> Array of array
 */
function groupById(events){
    if (events === undefined || events.length <= 0) return [];
    else if( events.length === 1) return [events[0]];

    let array = [];
    let arrays = [];
    let prevId = events[0].activity.id;

    events.forEach(event => {
        let id = event.activity.type === "Follow" ? event.activity.id : event.activity.object.id;

        if( prevId !== id) {
            arrays.push(array);
            array = [];
            prevId = id;
        }

        array.push(event);
    });

    arrays.push(array);

    return arrays;

}

/*
    Replay all the events in sequential order for a given object
        Array events : Array of follow events for the same object
    @return -> the final state of the object
 */
function replayFollow(events){
    if( events === undefined ) return null;
    else if(!Array.isArray(events)) return events.activity;

    let accept = false;
    let remove = false;
    let prevAction = '';
    let currentState = {};

    events.forEach(event => {

        switch(event.activity.type){
            case 'Follow' :
                currentState = event.activity;
                prevAction = 'Follow';
                break;
            case 'Undo' :
                if(prevAction === 'Accept' || prevAction === 'Reject') accept = !accept;
                else remove = !remove;
                prevAction = 'Undo';
                break;
            case 'Accept' :
                accept = true;
                prevAction = 'Accept';
                break;
            case 'Reject' :
                accept = false;
                prevAction = 'Reject';
                break;
            default :
                throw new Error("Unhandled activity type : "+event.activity.type)
        }
    });

    if( accept && !remove) return currentState;
    return null;
}




module.exports = router;
