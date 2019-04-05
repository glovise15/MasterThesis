const request = require('request');
const host = 'http://localhost:3124/share'

function createShare (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createShare()')
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

function updateShare (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('updateShare()')
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

function removeShare (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createShare()')
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

function undoShare (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createShare()')
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
    createShare,
    updateShare,
    removeShare,
    undoShare
}