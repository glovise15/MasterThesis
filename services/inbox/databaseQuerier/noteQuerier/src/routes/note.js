const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service note',
        object
    })
});

// GET 	/noteDB/object/:actorname/:objectId/:token 	- 	jsonObject[activityStreams] 	Get the last state of [objectId] (all if not specified).

module.exports = router;
