const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service outboxCollection',
        object
    })
});

// POST 	/inbox/out/add 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Add the object in the collection specified in the target property.
// POST 	/inbox/out/remove 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Remove the object in the collection specified in the target property.
// POST 	/inbox/out/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous add or remove operations.


module.exports = router;
