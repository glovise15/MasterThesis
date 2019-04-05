const request = require('request');
const host = 'http://localhost:3120/note'

function createNote (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createNote()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/create',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}

function updateNote (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('updateNote()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/update',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}

function removeNote (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createNote()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/remove',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}

function undoNote (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createNote()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/undo',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}
module.exports = {
    createNote,
    updateNote,
    removeNote,
    undoNote
}