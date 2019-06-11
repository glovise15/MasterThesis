const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");
const actorHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.ACTOR_QUERY_PORT+"/actor/get/";
const noteHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.NOTE_QUERY_PORT+"/note/get/";
const likeHost = process.env.PREFIX+''+process.env.HOST+':'+process.env.LIKE_QUERY_PORT+"/like/get/";
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
    Retrieve all the likes done by [actor]
        String actor : id of an actor
    @return -> array of like object
 */
router.get('/likedBy/:actor', (req, res) => {
    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [
                    {
                        $and: [
                            { 'activity.type': { $contains: "Like" }},
                            { 'activity.actor' : { $contains: actorHost+""+req.params.actor }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Like" }},
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

            let likes = [];
            groupById(events).forEach(array => {
                let replayedEvent = replayLike(array);
                if (replayedEvent != null) likes.push(replayedEvent.object);
            });
            if(likes === undefined || likes < 1) {
                let err = "No objects found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    likes
                });
            }
        });
    })
        .catch((err) => {
            console.log(err)
        });

});

/*
    Retrieve all the actors that have liked [object]
        String actor : id of an actor
    @return -> array of like object
 */
router.get('/likes/:object', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read({
            where: {
                $or: [

                            { 'activity.object' : { $contains: noteHost+""+req.params.object }},
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Like" }},
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
                let replayedEvent = replayLike(array);
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
                            { 'activity.id' : { $contains: likeHost+""+req.params.object }}
                        ]
                    },
                    {
                        $and: [
                            { 'activity.type': { $contains: "Undo" }},
                            { 'activity.object.type': { $contains: "Like" }},
                            { 'activity.object.id' : { $contains: likeHost+""+req.params.object }}
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
            let like = replayLike(events);
            if(like === undefined || like < 1) {
                let err = "No activity found";
                res.status(404).json({
                    status: 'error',
                    err
                });
            } else {
                res.status(201).json({
                    status: 'success',
                    like
                });
            }
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
    let prevId = events[0].activity.id;
    events.forEach(event => {
        let id = event.activity.type === "Like" ? event.activity.id : event.activity.object.id;

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
    else if(!Array.isArray(events)) return events.activity;

    let remove = false;
    let prevAction = '';
    let currentState = {};
    events.forEach(event => {
        switch(event.activity.type){
            case 'Like' :
                currentState = event.activity;
                prevAction = 'Like';
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
