const request = require('request');
const host = 'http://172.25.0.1:3124/share'


/*
    Send the create activity to the share inbox service
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
function createShare (req) {
    console.log('createShare()')
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
    Send the remove activity to the share inbox service
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
function removeShare (req) {
    console.log('removeShare()')
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
    Send the undo activity to the share inbox service
        String summary : quick summary about the relationship
        String type : Announce
        String id : unique identifier
        String actor : the actor that perform the share
        String object : the id of the object shared
    @return -> success or error
 */
function undoShare (req) {
    console.log('undoShare()')
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
        actor: object['actor'],
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
    return object.hasOwnProperty("type") && object.hasOwnProperty("id") && object.hasOwnProperty("actor") && object.hasOwnProperty("object") && object['type'] !== 'Announce'
}

module.exports = {
    createShare,
    removeShare,
    undoShare,
    isActivity
}
