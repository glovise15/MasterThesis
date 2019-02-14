const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

router.get('/', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.activityPub.activity().follow({text:"new follow"}).failed(console.log);
    })
        .catch((err) => {
            console.log(err)
        });

    res.status(200).json({
        status: 'success, service follow'
    })
});

// POST 	/inbox/follow 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Subscribe to the activities of another actor.
// POST 	/inbox/follow/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous follow.
// POST 	/inbox/follow/accept 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Accept a following for a follow activity sent previously.
// POST 	/inbox/follow/reject 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Reject a following for a follow activity sent previously.

module.exports = router;
