const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.ACTOR_QUERY_PORT+"/actor/get/";
const noteHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.NOTE_QUERY_PORT+"/note/get/";
const shareHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.SHARE_QUERY_PORT+"/share/get/";

/*
    Subscription to the share topic
 */
wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'shared'}
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
    Retrieve the objects shared by [actor]
        String actor : id of an actor
    @return -> array of share object
 */
router.get('/sharedBy/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Announce" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Announce" }},
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

            let shared = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayShare(array);
                if (replayedEvent != null) shared.push(replayedEvent.object);
            });
            if(shared === undefined || shared < 1) {
                let err = "No shared found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    shared
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve the actors that shared [object]
        String actor : id of an actor
    @return -> array of share object
 */
router.get('/sharedWith/:object', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Announce" }},
                            { 'activity.object' : { $contains: noteHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Announce" }},
                            { 'activity.object.object' : { $contains: noteHost+""+req.params.object }}
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

            let actors = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayShare(array);
                if (replayedEvent != null) actors.push(replayedEvent.actor);
            });
            if(actors === undefined || actors < 1) {
                let err = "No actors found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    actors
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve a share activity
        String object : id of a block activity
    @return -> share activity
 */
router.get('/get/:object', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Announce" }},
                            { 'activity.id' : { $contains: shareHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Announce" }},
                            { 'activity.object.id' : { $contains: shareHost+""+req.params.object }}
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
            let share = replayShare(events);
            if(share === undefined || share < 1) {
                let err = "No activity found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    share
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });
});

/*
    Split an array of share events into an array of array for each sequence of event relative to the same object
        Array events : array of share events
    @return -> Array of array
 */
function groupById(events){
    if (events === undefined || events.length <= 0) return [];
    else if( events.length === 1) return [events[0]];

    let array = [];
    let arrays = [];
    let prevId = events[0].activity.id;

    events.forEach(event => {
        let id = event.activity.type === "Announce" ? event.activity.id : event.activity.object.id;

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
        Array events : Array of share events for the same object
    @return -> the final state of the object
 */
function replayShare(events){
    if( events === undefined ) return null;
    else if(!Array.isArray(events)) return events.activity;

    let remove = false;
    let prevAction = '';
    let currentState = {};

    events.forEach(event => {
        switch(event.activity.type){
            case 'Announce' :
                currentState = event.activity;
                prevAction = 'Announce';
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
