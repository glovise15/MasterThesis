const log = require('debug')('actor-db')
//const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const actorDB = require('nano')("http://admin:admin@actor-db:5984/actor")

function createActor (req) {
    var user = req.body.user;
    var type = req.body.type;
    var id = req.body.id;
    var name = req.body.name;
    var preferredUsername = req.body.preferredUsername;
    var summary = req.body.summary;
    var inbox = req.body.inbox;
    var outbox = req.body.outbox;
    var followers = req.body.followers;
    var following = req.body.following;
    var liked = req.body.liked;

    return new Promise((resolve, reject) => {
        actorDB.insert({user:user, type:type, id:id, name:name, preferredUsername:preferredUsername, summary:summary, inbox:inbox, outbox:outbox, followers:followers, following:following, liked:liked}, preferredUsername, (ko, ok) => {
            if (ko) {
                console.log(ko)
                log(ko);
                reject(ko.reason)
            } else resolve(req.body)
        })
    })
}

function updateActor (req) {
    var actorname = req.body.actorname
    var user = req.body.user
    console.log('createActor()')
    return new Promise((resolve, reject) => {
        /*actorDB.insert({user:user}, actorname, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(user)
        })*/
    })
}

function removeActor (req) {
    var actorname = req.body.actorname
    console.log('createActor()')
    return new Promise((resolve, reject) => {
        actorDB.remove(actorname, (ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        })
    })
}

module.exports = {
    createActor,
    updateActor,
    removeActor
}