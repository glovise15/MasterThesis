const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a share event
        String type : type of activity
        String id : unique identifier
        String actor : the actor sharing the object
        String object : the relationship object
    @return -> success or error
 */
function publishShareEvent (activity) {
    console.log('publishShareEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().share(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve("Share activity published"));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishShareEvent
}

