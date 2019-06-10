const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a like event
        Activity activity : the activity to publish
    @return -> success or error
 */
function publishLikeEvent (activity) {
    console.log('publishLikeEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().like(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve(activity));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishLikeEvent
}

