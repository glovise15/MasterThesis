const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service like',
        object
    })
});

// GET 	/likeDB/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of liked objects.

module.exports = router;
