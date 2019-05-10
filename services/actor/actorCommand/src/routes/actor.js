const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

// MUST HAVE fields for an actor
const fields = ['user', 'type', 'id','name','summary','inbox','outbox','followers','following','liked'];

/*
    Create a new actor
        String user: id of the user
        String type: type of the actor (Application, Group, Organization, Person, Service)
        String id: actor's unique global identifier
        String name: name of the actor
        String summary: quick summary or bio by the user about themselves.
        [ActivityStreams] OrderedCollection inbox: reference to an ordered collection comprised of all the messages received by the actor
        [ActivityStreams] OrderedCollection outbox: reference to an ordered collection comprised of all the messages produced by the actor
        [ActivityStreams] Collection followers: reference to a collection comprised of all the actors that follow this actor
        [ActivityStreams] Collection following: reference to a collection comprised of all the actors that this actor is following
        [ActivityStreams] Collection liked: reference to a collection of objects this actor  has liked
        + additional fields
   @return -> success or error
 */
router.post('/create', (req, res) => {
    if(req.body === undefined || Object.keys(req.body).length < 10 || !fields.every(field => req.body.hasOwnProperty(field))) {
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        console.log(`Try to create new actor`)
        return actorHelpers.createActor(req)
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

});

/*
    Update an existing actor
        String id : actor's unique global identifier
        Different combinations of parameters possible between preferredUsername, type, name and summary
   @return -> success or error
 */
router.post('/update', (req, res) => {

    if(req.body === undefined || Object.keys(req.body).length < 2 || !req.body.hasOwnProperty("id") ){
        return res.status(500).json({
            status: 'error',
            message: 'Id required and at least one field to modify'
        });
    }else{

        if(!objectsKeysAreValid(req.body)) throw new Error("Fields can only be preferredUsername, type, name and summary")

        return actorHelpers.updateActor(req)
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


});

/*
    Verifies that all the keys of [obj] are present in the fields array
        Object ob : object containing keys
    @return -> boolean
 */
function objectsKeysAreValid(obj){
    if(!obj) return false;
    Object.keys(obj).forEach(function(property){
        if(!fields.includes(property)) return false;
    })

    return true;
}

/*
    Remove an existing actor
        String id : actor's unique global identifier
   @return -> success or error
 */
router.post('/remove', (req, res) => {
    var id = req.body.id
    if(req.body === undefined || !Object.keys(req.body).length || !req.body.hasOwnProperty("id")){
        return res.status(500).json({
            status: 'error',
            message: 'Id of actor required'
        });
    }else{
        console.log(`try to remove actor :: actor=${id}`)
        return actorHelpers.removeActor(req)
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


});



module.exports = router;
