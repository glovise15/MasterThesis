const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service like',
        object
    })
});

// POST 	/outbox/like 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Like an object.
// POST 	/outbox/like/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous like.

module.exports = router;
