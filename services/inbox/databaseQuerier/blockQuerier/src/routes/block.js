const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = "http://172.25.0.1:3106/actor/get/"
const blockHost = "http://172.25.0.1:3109/block/get/"

/*
    Subscription to the block topic
 */
wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'blocked'}
    }).
    received((event, cancel) => {
        /*
            This is where we can handle the received event and eventually forward it to a database or other service such as the front end
         */
        console.log(event.data.type);
    });
})
    .catch((err) => {
        console.log(err)
    });

/*
    Retrieve all the actors that have blocked [actor]
        String actor : id of an actor
    @return -> block activity
 */
router.get('/blockedFrom/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Block" }},
                            { 'activity.object' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Block" }},
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
            let blocked = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayBlock(events);
                if (replayedEvent != null) blocked.push(replayedEvent.actor);
            });
            if(blocked === undefined || blocked < 1) {
                let err = "No notes found";
                res.status(500).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    blocked
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve all actors that [actor] has blocked
        String actor : id of an actor
    @return -> array of blockers
 */
router.get('/blocked/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Block" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Block" }},
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
            let blocked = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayBlock(array);
                if (replayedEvent != null) blocked.push(replayedEvent.object);
            });
            if(blocked === undefined || blocked < 1) {
                let err = "No notes found";
                res.status(500).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    blocked
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });
});

/*
    Retrieve a block activity
        String object : id of a block activity
    @return -> block activity
 */
router.get('/get/:object', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Block" }},
                            { 'activity.id' : { $contains: blockHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Block" }},
                            { 'activity.object.id' : { $contains: blockHost+""+req.params.object }}
                        ]
                    }

                ]

            },
orderBy: { 'activity.timestamp': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            if(!Array.isArray(events)) return events.activity;
            let replayedEvent = replayBlock(events);
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
    Split an array of block events into an array of array for each sequence of event relative to the same object
        Array events : array of block events
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
        Array events : Array of block events for the same object
    @return -> the final state of the object
 */
function replayBlock(events){
    if( events === undefined ) return null;
    else if(!Array.isArray(events)) return events.activity;

    let remove = false;
    let prevAction = '';
    let currentState = {};

    events.forEach(event => {
        switch(event.activity.type){
            case 'Block' :
                currentState = event.activity;
                prevAction = 'Block';
                break;
            case 'Undo' :
                remove = !remove;
                prevAction = 'Undo';
                break;
            default :
                throw new Error("Unhandled activity type")
        }
    });

    if(!remove) return currentState;
    return null;
}



module.exports = router;
