const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service share',
        object
    })
});

// GET 	/shareDB/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of shared objects.

module.exports = router;
