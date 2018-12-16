const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    var object = {logo: "hello", name: "polo"}
    res.status(200).json({
        status: 'success, service user',
        object
    })
});

// GET /user/:username/:password
// GET /user/:username/:token/authorization

module.exports = router;
