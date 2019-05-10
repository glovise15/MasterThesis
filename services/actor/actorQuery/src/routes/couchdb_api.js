const log = require('debug')('actor-db')
//const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const actorDB = require('nano')("http://admin:admin@actor-db:5984/actor")

function getAll (req) {
    console.log('getAll actors()')
    return new Promise((resolve, reject) => {
        actorDB.find({ selector: { user: req.params.user } }, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else {
                if (ok.docs.length === 0) reject("user not found")
                else resolve(ok)
            }
        })
    })
}

function get (req) {
    console.log('get actor()')
    return new Promise((resolve, reject) => {
        actorDB.get(req.params.id, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(ok)
        })
    })
}



module.exports = {
    getAll,
    get
}