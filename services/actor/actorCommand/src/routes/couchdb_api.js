const log = require('debug')('actor-db')
const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
console.log(process.env.COUCHDB_DB_URL)

function createActor (req) {
    var actorname = req.body.actorname
    var username = req.body.username
    console.log('createActor()')
    return new Promise((resolve, reject) => {
        actorDB.insert({username:username}, actorname, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        })
    })
}

function updateActor (req) {
    var actorname = req.body.actorname
    var username = req.body.username
    console.log('createActor()')
    return new Promise((resolve, reject) => {
        /*actorDB.insert({username:username}, actorname, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
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