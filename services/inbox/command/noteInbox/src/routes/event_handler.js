const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a note event
        Activity activity : the activity to publish
    @return -> success or error
 */
function publishNoteEvent (activity) {
    console.log('publishNoteEvent()')
    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().post(activity)
                    .failed(err => reject(err))
                    .delivered(() => resolve(activity));
            }).catch((error) => {
            console.log(error);
        })
    });
}

module.exports = {
    publishNoteEvent
}

