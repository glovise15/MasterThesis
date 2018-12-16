const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service outboxCollection',
        object
    })
});


// GET 	/outboxDB/:actorname/:token 	- 	jsonObject[activityStreams] 	Get all the activities sent by actorname.

module.exports = router;
