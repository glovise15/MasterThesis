const wolkenkit = require("../eventStore");

function publishLikeEvent (req) {
    var actorname = req.body.actorname
    var activity = req.body.activity
    console.log('publishLikeEvent()')

    return new Promise((resolve, reject) => {
        wolkenkit.then((eventStore), (ko, ok) => {
            eventStore.activityPub.activity().like({actorname: actorname, activity:activity}).failed(console.log);
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
    publishLikeEvent
}

