const request = require('request');
const host = 'http://172.25.0.1:3112/follow'


/*
    Send the create activity to the follow inbox service
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the follower actor
        String relationship : type of the relationship (Follow)
        String object : the followed actor
    @return -> success or error
 */
function createFollow (req) {
    console.log('createFollow()')
    var activity = isActivity(req.body) ? req.body : toActivity(req.body, "Create") ;
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers['authorization']},
            url: host + '/create',
            body: activity,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response)
            else reject(error)
        });
    });

}

/*
    Send the remove activity to the follow inbox service
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the follower actor
        String relationship : type of the relationship (Follow)
        String object : the followed actor
    @return -> success or error
 */
function removeFollow (req) {
    console.log('removeFollow()')
    var activity = isActivity(req.body) ? req.body : toActivity(req.body, "Remove") ;
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers['authorization']},
            url: host + '/remove',
            body: activity,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response)
            else reject(error)
        });
    });
}

/*
    Send the accept activity to the follow inbox service
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the follower actor
        String relationship : type of the relationship (Follow)
        String object : the followed actor
    @return -> success or error
 */
function acceptFollow (req) {
    console.log('acceptFollow()')
    var activity = isActivity(req.body) ? req.body : toActivity(req.body, "Accept") ;
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers['authorization']},
            url: host + '/accept',
            body: activity,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response)
            else reject(error)
        });
    });
}

/*
    Send the reject activity to the follow inbox service
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the follower actor
        String relationship : type of the relationship (Follow)
        String object : the followed actor
    @return -> success or error
 */
function rejectFollow (req) {
    console.log('rejectFollow()')
    var activity = isActivity(req.body) ? req.body : toActivity(req.body, "Reject") ;
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers['authorization']},
            url: host + '/reject',
            body: activity,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response)
            else reject(error)
        });
    });
}

/*
    Send the undo activity to the follow inbox service
        String summary : quick summary about the relationship
        String type : relationship
        String id : unique identifier
        String subject : the follower actor
        String relationship : type of the relationship (Follow)
        String object : the followed actor
    @return -> success or error
 */
function undoFollow (req) {
    console.log('undoFollow()')
    var activity = isActivity(req.body) ? req.body : toActivity(req.body, "Undo") ;
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers['authorization']},
            url: host + '/undo',
            body: activity,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response)
            else reject(error)
        });
    });
}

/*
    Encapsulate an object into an activity
        Object object : the object to include in the activity
        String type : the type of activity (Create, Remove, Undo, ....)
    @return -> the new activity
 */
function toActivity(object, type){
    return {
        "@context": object['@context'],
        type: type,
        id: Date.now(),
        actor: object['subject'],
        object: object,
        published : Date.now()
    };

}

/*
    Verifies if [object] is already an activity
        Object object : the object to check
    @return -> boolean
 */
function isActivity(object){
    return object.hasOwnProperty("type") && object.hasOwnProperty("id") && object.hasOwnProperty("actor") && object.hasOwnProperty("object") && object['type'] !== 'Follow'
}

module.exports = {
    createFollow,
    removeFollow,
    acceptFollow,
    rejectFollow,
    undoFollow,
    isActivity
}