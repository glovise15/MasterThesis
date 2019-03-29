const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service actor command',
        object
    })
});

// POST /actor/create
// POST /actor/update
// POST /actor/delete

module.exports = router;
