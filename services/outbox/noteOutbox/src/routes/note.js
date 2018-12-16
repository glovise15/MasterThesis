const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service note',
        object
    })
});

// POST 	/outbox/note/create 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Creation of an activity.
// POST 	/outbox/note/update 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Update of an activity already existing.
// POST 	/outbox/note/delete 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Removal of an activity already existing.
// POST 	/outbox/note/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo the last action on a note.

module.exports = router;
