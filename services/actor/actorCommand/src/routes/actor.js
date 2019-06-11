const express = require('express');
const log = require('debug')('actor-db')
const router = express.Router();
const actorHelpers = require('./couchdb_api')

// MUST HAVE fields for an actor
const fields = ['user', 'type', 'id','name','summary'];

/*
    Create a new actor
        String user: id of the user
        String type: type of the actor (Application, Group, Organization, Person, Service)
        String id: actor's unique global identifier
        String name: name of the actor
        String summary: quick summary or bio by the user about themselves.
   @return -> success or error
 */
router.post('/create', (req, res) => {
    let actor = req.body;
    if(actor === undefined || Object.keys(actor).length < 5 || !fields.every(field => actor.hasOwnProperty(field))) {
        return res.status(500).json({
            status: 'error',
            message: "Fields required : " + fields
        });
    }else{
        console.log(`Try to create new actor`);
        let actor = req.body;
        actor['inbox'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.HOST_PORT + '/inbox/' + actor.id ;
        actor['outbox'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.HOST_PORT + '/outbox/' + actor.id ;
        actor['followers'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.FOLLOW_QUERY_PORT + '/follow/follower/'+ actor.id;
        actor['following'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.FOLLOW_QUERY_PORT + '/follow/following/'+ actor.id;
        actor['liked'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.LIKE_QUERY_PORT + '/like/liked/'+ actor.id;
        actor['identifier'] = actor.id;
        actor['id'] = process.env.PREFIX +''+ process.env.HOST +':'+ process.env.ACTOR_QUERY_PORT + '/actor/get/' + actor.id;

        return actorHelpers.createActor(actor)
            .then((data) => {
                res.status(201).json({
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
        String identifier : actor's unique identifier (not url)
        Different combinations of parameters possible between preferredUsername, type, name and summary
   @return -> success or error
 */
router.post('/update', (req, res) => {
    let actor = req.body
    if(actor === undefined || Object.keys(actor).length < 2 || !actor.hasOwnProperty("identifier") ){
        return res.status(500).json({
            status: 'error',
            message: 'Id required and at least one field to modify'
        });
    }else{

        if(!objectsKeysAreValid(actor)) throw new Error("Fields can only be preferredUsername, type, name and summary")

        return actorHelpers.updateActor(actor)
            .then((data) => {
                res.status(201).json({
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
router.post('/delete', (req, res) => {
    let actor = req.body;
    let id = actor.id;
    if(actor === undefined || !Object.keys(actor).length || !actor.hasOwnProperty("identifier")){
        return res.status(500).json({
            status: 'error',
            message: 'Id of actor required'
        });
    }else{
        console.log(`try to delete actor :: actor=${id}`)
        return actorHelpers.deleteActor(actor)
            .then((data) => {
                res.status(201).json({
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
