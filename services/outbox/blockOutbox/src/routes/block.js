const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service block',
        object
    })
});

// POST 	/outbox/block 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
// POST 	/outbox/block/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous block.

module.exports = router;
