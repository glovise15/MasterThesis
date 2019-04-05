const wolkenkit = require("../eventStore");

function publishNoteEvent (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('publishNoteEvent()')

    return new Promise((resolve, reject) => {
        wolkenkit.then((eventStore), (ko, ok) => {
            eventStore.activityPub.activity().note({actorname: actorname, activity:activity}).failed(console.log);
        })
            .catch((err) => {
                console.log(err)
                reject(err)
            }).then(() => {
            resolve("ok");
        })
    });
}

module.exports = {
    publishNoteEvent
}

