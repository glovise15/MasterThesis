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
    like (activity, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        activity.events.publish ('liked', {
            text: command.data.text
        });
    },
    share (activity, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        activity.events.publish ('shared', {
            text: command.data.text
        });
    },
    follow (activity, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        activity.events.publish ('followed', {
            text: command.data.text
        });
    },
    block (activity, command){
        if (!command.data.text){
            return command.reject('Text is missing.');
        }

        activity.events.publish ('blocked', {
            text: command.data.text
        });
    }

};

const events = {
    posted (activity,event) {
        activity.setState({
            text: event.data.text
        });
    },
    liked (activity,event) {
        activity.setState({
            text: event.data.text
        });
    },
    shared (activity,event) {
        activity.setState({
            text: event.data.text
        });
    },
    followed (activity,event) {
        activity.setState({
            text: event.data.text
        });
    },
    blocked (activity,event) {
        activity.setState({
            text: event.data.text
        });
    }
};

module.exports = {initialState, commands, events };
