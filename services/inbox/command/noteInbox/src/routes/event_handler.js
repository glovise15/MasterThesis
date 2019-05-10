const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a note event
        String type : type of activity
        String id : unique identifier
        String actor : the actor sharing the object
        String object : the relationship object
    @return -> success or error
 */
function publishNoteEvent (activity) {
    console.log('publishNoteEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().post(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve("Note activity published"));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishNoteEvent
}

