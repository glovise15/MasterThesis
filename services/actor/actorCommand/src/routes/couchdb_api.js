const log = require('debug')('actor-db')
const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
//const actorDB = require('nano')("http://admin:admin@actor-db:5984/actor")

/*
    Insert a new actor in the database
        String user: id of the user
        String type: type of the actor (Application, Group, Organization, Person, Service)
        String id: actor's reference to it's profile
        String identifier: actor's unique identifier
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
function createActor (actor) {
    return new Promise((resolve, reject) => {
        actorDB.insert(actor, actor.identifier, (ko, ok) => {
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
        String identifier : actor's unique identifier (not url)
        Different combinations of parameters possible between preferredUsername, type, name and summary
   @return -> success or error
 */
function updateActor (actor) {
    console.log('updateActor()')
    return new Promise((resolve, reject) => {
        actorDB.get(actor.identifier, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else {
                Object.keys(actor).forEach(key => ok[key] = actor[key])
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
        Actor actor : actor's profile
   @return -> success or error
 */
function deleteActor (actor) {
    console.log('deleteActor()')
    return new Promise((resolve, reject) => {
        actorDB.get(actor.identifier, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else {
                actorDB.destroy(actor.identifier, ok._rev, (kko,okk) => {
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
    deleteActor
}