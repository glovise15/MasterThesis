const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service share',
        object
    })
});

// POST 	/inbox/share 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Share/repost the actvity of another actor.
// POST 	/inbox/share/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous share.

module.exports = router;
