const request = require('request');
const host = 'http://localhost:3112/follow'

function createFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createFollow()')
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

function updateFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('updateFollow()')
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

function removeFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('removeFollow()')
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

function acceptFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('acceptFollow()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/accept',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}

function rejectFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('rejectFollow()')
    return new Promise((resolve, reject) => {
        request.post({
            headers: {'content-type' : 'application/json'},
            url: host + '/reject',
            body: {actorname: actorname, activity: activity}
        },(ko, ok, body) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        });
    })
}

function undoFollow (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('undoFollow()')
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
    createFollow,
    updateFollow,
    removeFollow,
    acceptFollow,
    rejectFollow,
    undoFollow
}