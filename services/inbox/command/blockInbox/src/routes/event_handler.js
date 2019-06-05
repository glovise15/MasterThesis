const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a block event
        Activity activity : the activity to publish
    @return -> success or error
 */
function publishBlockEvent (activity) {
    console.log('publishBlockEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().block(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve("Block activity published"));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishBlockEvent
}

