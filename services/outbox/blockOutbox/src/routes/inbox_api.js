const request = require('request');
const host = 'http://172.25.0.1:3108/blockIB/';
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
        String urn : create or undo
    @return -> array of promises
 */
function postToAllRecipients(req, urn){
    let regExp = /https?:\/\/([0-9]{1,3}\.){3,3}[0-9]:[0-9]+(\/inbox)?\/([A-Z]*[a-z]*[0-9]*)+/gi;
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
            throw new Error("Error while posting to recipients, " + err)
        });
}

/*
    Send a POST request to [location]
        String location : the URL of the service
        Request req : the request containing the activity to send
    @return -> promise
 */
function postTo(location, req){
    return new Promise((resolve, reject) => {
        request.post({
            headers: {"Content-Type": 'application/json', Authorization: req.headers.authorization},
            url: location,
            body: req.body,
            json: true
        }, function (error, response, body){
            if (!error && body.status !== 'error') resolve(body.data);
            else reject(error ? error : "incorrect post url : "+location)
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
                if (!recipient.includes("#public")) promises.push(getFrom(token, recipient))
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
            if (!error && body.status !== 'error') resolve(body);
            else reject(error ? error : "incorrect get url : "+location)
        });
    });
}

module.exports = {
    sendActivity
};
