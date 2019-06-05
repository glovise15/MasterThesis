const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

/*
    Subscription to the like topic
 */
wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'liked'}
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
    Retrieve all the likes
        String actor : id of an actor
    @return -> array of like object
 */
router.get('/liked/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Like" }},
                            { 'activity.actor' : { $contains: req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Like" }},
                            { 'activity.actor' : { $contains: req.params.actor }}
                        ]
                    }

                ]

            },
            orderBy: { 'activity.published': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            console.log(events)
            let liked = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayLike(array);
                if (replayedEvent != null) liked.push(replayedEvent);
            });
            res.status(200).json({
                status: 'success',
                liked
            });
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve a like activity
        String object : id of a like activity
    @return -> like activity
 */
router.get('/get/:object', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Like" }},
                            { 'activity.id' : { $contains: req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Like" }},
                            { 'activity.object.id' : { $contains: req.params.object }}
                        ]
                    }

                ]

            },
            orderBy: { 'activity.published': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            if(!Array.isArray(events)) return events.activity;
            let replayedEvent = replayLike(events);
            res.status(200).json({
                status: 'success',
                replayedEvent
            });
        });
    })
        .catch((err) => {
            console.log(err)
        });
});

/*
    Split an array of like events into an array of array for each sequence of event relative to the same object
        Array events : array of like events
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
        Array events : Array of like events for the same object
    @return -> the final state of the object
 */
function replayLike(events){
    if( events === undefined ) return null;
    else if(!Array.isArray(events)) return events.activity.object;

    let remove = false;
    let prevAction = '';
    let currentState = {};

    events.forEach(event => {
        switch(event.activity.type){
            case 'Create' :
                currentState = event.activity.object;
                prevAction = 'Create';
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
