const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service like',
        object
    })
});

// POST /inbox/like zactorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Like an object.
// POST /inbox/like/undo actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous like.

module.exports = router;
