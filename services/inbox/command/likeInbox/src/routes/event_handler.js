const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a like event
        String type : type of activity
        String id : unique identifier
        String actor : the likeer actor
        String object : the relationship object
    @return -> success or error
 */
function publishLikeEvent (activity) {
    console.log('publishLikeEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().like(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve("Like activity published"));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishLikeEvent
}

