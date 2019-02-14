'use strict';

const fields = {
    text: { initialState: '' },
    timestamp: { initialState: 0, fastLookup: true }
};

const projections = {
    'activityPub.activity.posted' (activities, event) {
        activities.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    },
    'activityPub.activity.liked' (activities, event) {
        activities.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    },
    'activityPub.activity.shared' (activities, event) {
        activities.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    },
    'activityPub.activity.followed' (activities, event) {
        activities.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    },
    'activityPub.activity.blocked' (activities, event) {
        activities.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    }
};

module.exports = { fields, projections };
