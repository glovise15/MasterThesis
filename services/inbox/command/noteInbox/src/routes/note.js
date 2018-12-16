const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service note',
        object
    })
});

// POST /inbox/note/create 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Creation of an activity.
// POST /inbox/note/update 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Update of an activity already existing.
// POST /inbox/note/delete 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Removal of an activity already existing.
// POST /inbox/note/undo

module.exports = router;
