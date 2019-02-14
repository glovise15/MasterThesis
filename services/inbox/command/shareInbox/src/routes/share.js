const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

router.get('/', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.activityPub.activity().share({text:"new share"}).failed(console.log);
    })
        .catch((err) => {
            console.log(err)
        });

    res.status(200).json({
        status: 'success, service share'
    })
});

// POST 	/inbox/share 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Share/repost the actvity of another actor.
// POST 	/inbox/share/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous share.

module.exports = router;
