const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a follow event
        Activity activity : the activity to publish
    @return -> success or error
 */
function publishFollowEvent (activity) {
    console.log('publishFollowEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().follow(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve("Follow activity published"));
            }).catch((error) => {
                console.log(error);
            })
    });
}

module.exports = {
    publishFollowEvent
}

