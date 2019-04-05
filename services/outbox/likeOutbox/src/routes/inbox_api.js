const request = require('request');
const host = 'http://localhost:3116/like'

function createLike (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createLike()')
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

function updateLike (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('updateLike()')
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

function removeLike (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createLike()')
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

function undoLike (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createLike()')
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
    createLike,
    updateLike,
    removeLike,
    undoLike
}