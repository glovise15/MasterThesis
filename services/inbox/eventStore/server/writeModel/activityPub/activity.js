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
        if (!command.data){
            return command.reject('Activity is missing.');
        }

        activity.events.publish ('posted', command.data);
    },
    like (activity, command){
        if (!command.data){
            return command.reject('Activity is missing.');
        }

        activity.events.publish ('liked', command.data);
    },
    share (activity, command){
        if (!command.data){
            return command.reject('Activity is missing.');
        }

        activity.events.publish ('shared', command.data);
    },
    follow (activity, command){
        console.log(command.data)
        if (!command.data){
            return command.reject('Activity is missing.');
        }

        activity.events.publish ('followed', command.data);
    },
    block (activity, command){
        if (!command.data){
            return command.reject('Activity is missing.');
        }

        activity.events.publish ('blocked', command.data);
    }

};

const events = {
    posted (activity,event) {
        activity.setState(event.data);
    },
    liked (activity,event) {
        activity.setState(event.data);
    },
    shared (activity,event) {
        activity.setState(event.data);
    },
    followed (activity,event) {
        activity.setState(event.data);
    },
    blocked (activity,event) {
        activity.setState(event.data);
    }
};

module.exports = {initialState, commands, events };
