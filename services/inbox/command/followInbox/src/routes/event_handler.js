const wolkenkit = require("../eventStore");


/*
    Publish an activity in the wolkenkit event store as a follow event
        Activity activity : the activity to publish
    @return -> success or error
 */
function publishFollowEvent (folllowActivity, approvalActivity) {

    return new Promise((resolve, reject) => {
        wolkenkit
            .then((eventStore) => {
                eventStore.activityPub.activity().follow(folllowActivity)
                    .failed(err => reject(err))
                    .delivered(() => {
                        if(approvalActivity != null){
                            eventStore.activityPub.activity().follow(approvalActivity)
                                .failed(err => reject(err))
                                .delivered(() => resolve(folllowActivity))
                        }
                        else resolve(folllowActivity)
                    })

            }).catch((error) => {
                console.log(error);
            })
    });
}

module.exports = {
    publishFollowEvent
}

