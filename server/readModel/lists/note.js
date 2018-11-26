'use strict';

const fields = {
    text: { initialState: '' },
    timestamp: { initialState: 0, fastLookup: true }
};

const projections = {
    'activityPub.note.posted' (notes, event) {
        notes.add({
            text: event.data.text,
            timestamp: event.metadata.timestamp
        });
    }
};

module.exports = { fields, projections };