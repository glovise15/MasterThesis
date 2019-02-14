const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'posted'}
    }).
    received((event, cancel) => {
        console.log(event);
    });
})
.catch((err) => {
    console.log(err)
});

router.get('/getAll', (req, res) => {

    wolkenkit.then((eventStore) => {
        eventStore.lists.activities.read().
        finished((messages) => {
            res.status(200).json({
                status: 'success, service note',
                messages
            });
        });
    })
    .catch((err) => {
        console.log(err)
    });


});


// GET 	/noteDB/object/:actorname/:objectId/:token 	- 	jsonObject[activityStreams] 	Get the last state of [objectId] (all if not specified).

module.exports = router;
