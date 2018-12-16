const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service block',
        object
    })
});

// GET 	/blockDB/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of blocked actors.

module.exports = router;
