const wolkenkit = require("../eventStore");

function publishFollowEvent (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('publishFollowEvent()')

    return new Promise((resolve, reject) => {
        wolkenkit.then((eventStore), (ko, ok) => {
            eventStore.activityPub.activity().follow({actorname: actorname, activity:activity}).failed(console.log);
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
    publishFollowEvent
}

