const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

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
                $and: [
                    { 'activity.actor' : { $contains: req.params.actor }},
                    { 'activity.object.type': { $contains: "Announce" }}
                ]
            },
            orderBy: { 'activity.object.id': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            console.log(events)
            let shared = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayShare(array);
                if (replayedEvent != null) shared.push(replayedEvent);
            });
            res.status(200).json({
                status: 'success',
                shared
            });
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
                $and: [
                    { 'activity.object.object.id' : { $contains: req.params.object }},
                    { 'activity.object.type': { $contains: "Announce" }}
                ]
            },
            orderBy: { 'activity.object.id': 'ascending'}
        }).
        failed(err =>{
            res.status(500).json({
                status: 'error',
                err
            });
        }).
        finished(events => {
            console.log(events)
            let shared = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayShare(array);
                if (replayedEvent != null) shared.push(replayedEvent);
            });
            res.status(200).json({
                status: 'success',
                shared
            });
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
        Array events : Array of share events for the same object
    @return -> the final state of the object
 */
function replayShare(events){
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
            case 'Remove' :
                remove = true;
                prevAction = 'Remove';
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
