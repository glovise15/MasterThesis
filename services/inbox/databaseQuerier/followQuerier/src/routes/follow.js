const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = "http://172.25.0.1:3106/actor/get/"
const followHost = "http://172.25.0.1:3113/follow/get/"


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
router.get('/follower/:actor', (req, res) => {
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
            let follows = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayFollow(array);
                if (replayedEvent != null) follows.push(replayedEvent.actor);
            });
            if(follows === undefined || follows < 1) {
                let err = "No notes found";
                res.status(500).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    follows
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
            let follows = [];
            groupById(events).forEach(array => {
               let replayedEvent = replayFollow(array);
               if (replayedEvent != null) follows.push(replayedEvent.object);
            });
            if(follows === undefined || follows < 1) {
                let err = "No notes found";
                res.status(500).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    follows
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
            console.log(events)
            if(!Array.isArray(events)) return events.activity;
            let replayedEvent = replayFollow(events);
            if(replayedEvent === undefined || replayedEvent < 1) {
                let err = "No activity found";
                res.status(500).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    replayedEvent
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
    let prevId = events[0].activity.object.id;

    events.forEach(event => {
        let id = event.activity.object.id;

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

    let accept = true;
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
