const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

router.get('/', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.activityPub.activity().block({text:"new block"}).failed(console.log);
    })
    .catch((err) => {
        console.log(err)
    });

    res.status(200).json({
        status: 'success, service block'
    })
});

// POST 	/inbox/block 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
// POST 	/inbox/block/undo 	actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous block.

module.exports = router;
