const log = require('debug')('actor-db')
//const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const actorDB = require('nano')("http://admin:admin@actor-db:5984/actor")

/*
    Insert a new actor in the database
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
function createActor (req) {
    var newActor = {};
    Object.keys(req.body).forEach(key => newActor[key] = req.body[key]);

    return new Promise((resolve, reject) => {
        actorDB.insert(newActor, req.body.id, (ko, ok) => {
            if (ko) {
                console.log(ko)
                log(ko);
                reject(ko.reason)
            } else resolve(ok)
        })
    })
}

/*
    Update an existing actor by inserting a newer version
        String id : actor's unique global identifier
        Different combinations of parameters possible between type, name and summary
   @return -> success or error
 */
function updateActor (req) {
    var id = req.body.id
    console.log('updateActor()')
    return new Promise((resolve, reject) => {
        actorDB.get(id, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else {
                Object.keys(req.body).forEach(key => ok[key] = req.body[key])
                actorDB.insert(ok, (kko, okk) =>{
                    if (kko) {
                        console.log(kko)
                        reject(kko.reason)
                    } else resolve(okk);
                })
            }
        })
    })
}

/*
    Remove an existing actor from the database
        String id : actor's unique global identifier
   @return -> success or error
 */
function removeActor (req) {
    var id = req.body.id
    console.log('removeActor()')
    return new Promise((resolve, reject) => {
        actorDB.get(id, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else {
                actorDB.destroy(id, ok._rev, (kko,okk) => {
                    if (kko){
                        log(kko);
                        reject(kko.reason)
                    } else resolve({ok, okk})
                })
            }
        })
    })
}

module.exports = {
    createActor,
    updateActor,
    removeActor
}