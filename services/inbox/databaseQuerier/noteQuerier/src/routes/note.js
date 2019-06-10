const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = "http://172.25.0.1:3106/actor/get/"
const noteHost = "http://172.25.0.1:3121/note/get/"

/*
    Subscription to the note topic
 */
wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'posted'}
    }).
    received((event, cancel) => {
        /*
            This is where we can handle the received event and eventually forward it to a database or other service such as the front end
         */
        console.log(event.data.type + " activity received");
    });
})
    .catch((err) => {
        console.log(err)
    });

/*
    Retrieve the notes written by [actor]
        String actor : id of an actor
    @return -> array of note object
 */
router.get('/from/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $and: [
                    { 'activity.actor' : { $contains:actorHost+""+req.params.actor }},
                    { 'activity.object.type': { $contains: "Note" }}
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
            let notes = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayNote(array);
                if (replayedEvent != null) notes.push(replayedEvent);
            });
            if(notes === undefined || notes < 1) {
                let err = "No notes found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    notes
                });
            }

        });
    })
        .catch((err) => {
            throw new Error(err)
        });

});


/*
    Retrieve the notes written to [actor]
        String actor : id of an actor
    @return -> array of note object
 */
router.get('/to/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $and: [
                    { 'activity.to' : { $contains:actorHost+""+req.params.actor }},
                    { 'activity.object.type': { $contains: "Note" }}
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
            let notes = [];

            groupById(events).forEach(array => {
                let replayedEvent = replayNote(array);
                if (replayedEvent != null) notes.push(replayedEvent);
            });

            if(notes === undefined || notes < 1) {
                let err = "No notes found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    notes
                });
            }
        });
    })
        .catch((err) => {
            throw new Error(err)
        });

});


/*
    Retrieve a note object
        String object : id of a note
    @return -> note object
 */
router.get('/get/:object', (req, res) => {
    console.log("GET : "+ req.params.object)
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $and: [
                    { 'activity.object.id' : { $contains:noteHost+""+req.params.object }},
                    { 'activity.object.type': { $contains: "Note" }}
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
            let note = replayNote(events);
            if(note === undefined || note < 1) {
                let err = "No activity found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    note
                });
            }
        });
    })
        .catch((err) => {
            throw new Error(err)
        });
});

/*
    Split an array of note events into an array of array for each sequence of event relative to the same object
        Array events : array of note events
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
        Array events : Array of note events for the same object
    @return -> the final state of the object
 */
function replayNote(events){
    if( events === undefined ) return [];
    else if(!Array.isArray(events)) return events.activity;

    let remove = false;
    let prevAction = '';
    let currentState;
    let prevStates = [];
    events.forEach(event => {
        switch(event.activity.type){
            case 'Create' :
                currentState = event.activity.object;
                prevAction = 'Create';
                break;
            case 'Update' :
                prevStates.push(currentState);
                currentState = event.activity.object;
                prevAction = 'Update';
                break;
            case 'Delete' :
                remove = true;
                prevAction = 'Delete';
                break;
            default :
                throw new Error("Unhandled activity type")
        }
    });

    if(!remove && currentState !== undefined) return currentState;
    return null;
}



module.exports = router;
