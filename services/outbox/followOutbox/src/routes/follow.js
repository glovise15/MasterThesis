const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service follow',
        object
    })
});

// POST 	/outbox/follow 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Subscribe to the activities of another actor.
// POST 	/outbox/follow/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous follow.

module.exports = router;
