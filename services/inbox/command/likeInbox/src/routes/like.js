const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

router.get('/', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.activityPub.activity().like({text:"new like"}).failed(console.log);
    })
        .catch((err) => {
            console.log(err)
        });

    res.status(200).json({
        status: 'success, service like'
    })
});

// POST /inbox/like zactorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Like an object.
// POST /inbox/like/undo actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] 	- 	Undo a previous like.

module.exports = router;
