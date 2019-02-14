'use strict'

const initialState = {
    text : '',
    isAuthorized: {
        commands: {
            post: {forPublic: true},
            like: {forPublic: true},
            share: {forPublic: true},
            follow: {forPublic: true},
            block: {forPublic: true}
        },
        events: {
            posted: {forPublic: true},
            liked: {forPublic: true},
            shared: {forPublic: true},
            followed: {forPublic: true},
            blocked: {forPublic: true}

        }
    }
};

const commands = {
    post (activity, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        activity.events.publish ('posted', {
            text: command.data.text
        });
    },
    like (note, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        note.events.publish ('liked', {
            text: command.data.text
        });
    },
    share (note, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        note.events.publish ('shared', {
            text: command.data.text
        });
    },
    follow (note, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        note.events.publish ('followed', {
            text: command.data.text
        });
    },
    block (note, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        note.events.publish ('blocked', {
            text: command.data.text
        });
    }

};

const events = {
    posted (note,event) {
        note.setState({
            text: event.data.text
        });
    },
    liked (note,event) {
        note.setState({
            text: event.data.text
        });
    },
    shared (note,event) {
        note.setState({
            text: event.data.text
        });
    },
    followed (note,event) {
        note.setState({
            text: event.data.text
        });
    },
    blocked (note,event) {
        note.setState({
            text: event.data.text
        });
    }
};

module.exports = {initialState, commands, events };
