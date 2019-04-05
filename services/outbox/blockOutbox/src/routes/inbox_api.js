const request = require('request');
const host = 'http://localhost:3108/block'

function createBlock (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createBlock()')
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

function updateBlock (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('updateBlock()')
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

function removeBlock (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createBlock()')
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

function undoBlock (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('createBlock()')
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
    createBlock,
    updateBlock,
    removeBlock,
    undoBlock
}