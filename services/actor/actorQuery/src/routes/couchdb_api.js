const log = require('debug')('actor-db')
const actorDB = require('nano')(process.env.COUCHDB_DB_URL)
console.log(process.env.COUCHDB_DB_URL)

function getAll (req) {
    var username = req.body.username
    console.log('getAll actors()')
    return new Promise((resolve, reject) => {
        actorDB.find(username, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        })
    })
}

function get (req) {
    var username = req.body.username
    var actorname = req.body.actorname
    console.log('get actor()')
    return new Promise((resolve, reject) => {
        actorDB.find(actorname, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        })
    })
}



module.exports = {
    getAll,
    get
}