const request = require('request');
const host = 'http://172.25.0.1:3116/like/';
const recipientsField = ['to','cc','bto','bcc','audience']

/*
    Send the activity to the note inbox service
        String req : the request containing the activity to send
        String urn : create or undo
    @return -> success or error
 */
function sendActivity(req, urn){
    console.log('send '+req.body.type+' activity');
    return postToAllRecipients(req, urn)
}

/*
    Send a POST request to all the recipients of an activity
        Request req : the request containing the activity to send
        String type : the type of the activity
    @return -> array of promises
 */
function postToAllRecipients(req, urn){
    let regExp = /https?:\/\/([0-9]{1,3}\.){3,3}[0-9]:[0-9]+\/([A-Z]*[a-z]*)+\/inbox/gi;
    return getRecipientsList(req)
        .then((recipients) => {
            let promises = [];
            recipients.forEach((recipient) => {
                let inbox = recipient.data.inbox.match(regExp) ? host + '' + urn : recipient.data.inbox;
                promises.push(postTo(inbox, req))
            });
            return Promise.all(promises);
        })
        .catch((err) => {
            console.log("Error while posting to recipients : " + err)
        });
}

/*
    Send a POST request to [location]
        String location : the URL of the service
        Request req : the request containing the activity to send
    @return -> promise
 */
function postTo(location, req){
    console.log(req.body)
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers.authorization},
            url: location,
            body: req.body,
            json: true
        }, function (error, response, body){
            if (!error) resolve(response);
            else reject(error)
        });
    });
}

/*
    Retrieve all the recipients from their address in the to, bto, cc, bcc and audience fields of the activity
        Request req : the request containing the activity to send
    @return -> array of promises
 */
function getRecipientsList(req){
    let token = req.headers.authorization;
    let activity = req.body;
    let promises = [];
    recipientsField.forEach((field) => {
        if(activity[field] !== undefined) {
            let array = [].concat(activity[field] || []);
            array.forEach((recipient) => {
                promises.push(getFrom(token, recipient))
            })
        }
    });
    return Promise.all(promises);
}

/*
    Send a GET request to [location]
        String token : jwt bearer token
        String location : the URL of the service
    @return -> promise

 */
function getFrom(token, location){
    return new Promise((resolve, reject) => {
        request.get({
            headers: {"Content-Type": 'application/json', Authorization: token},
            url: location,
            json: true
        }, function (error, response, body){
            if (!error) resolve(body);
            else reject(error)
        });
    });
}

module.exports = {
    sendActivity
};
