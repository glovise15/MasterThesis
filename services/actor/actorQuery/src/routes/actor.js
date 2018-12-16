const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service actor query',
        object
    })
});

// GET /actor/all/:username
// GET /actor/:actorname


module.exports = router;
