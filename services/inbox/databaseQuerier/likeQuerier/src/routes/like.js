const express = require('express');
const router = express.Router();
const wolkenkit = require("../eventStore");

wolkenkit.then((eventStore) => {

    eventStore.events.observe({
        where: { name: 'liked'}
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
                status: 'success, service like',
                messages
            });
        });
    })
        .catch((err) => {
            console.log(err)
        });


});

// GET 	/likeDB/:actorname/:token 	- 	jsonObject[activityStreams] 	Get the list of liked objects.

module.exports = router;
