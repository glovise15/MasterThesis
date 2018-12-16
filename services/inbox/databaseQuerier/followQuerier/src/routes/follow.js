const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service follow',
        object
    })
});

// GET 	/followDB/followed/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of followed actors.
// GET 	/followDB/following/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of following actors.

module.exports = router;
