const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

router.get('/', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.activityPub.activity().post({text:"new note"}).failed(console.log);
    })
    .catch((err) => {
        console.log(err)
    });

    res.status(200).json({
        status: 'success, service note'
    })
});

// POST /inbox/note/create 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Creation of an activity.
// POST /inbox/note/update 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Update of an activity already existing.
// POST /inbox/note/delete 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Removal of an activity already existing.
// POST /inbox/note/undo

module.exports = router;
