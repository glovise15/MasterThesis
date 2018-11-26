'use strict'

const initialState = {
	text : undefined,
	isAuthorized: {
        commands: {
            post: {forPublic: true}
        },
        events: {
            posted: {forPublic: true}
        }
    }
};

const commands = {
	post (note, command, mark){
		if (!command.data.text){
			return mark.asRejected('Text is missing');
		}
		
		note.events.publish ('posted', {
			text: command.data.text
		});
		mark.asDone();	
	}	
};

const events = {
	posted (note,event) {
        note.setState({
            text: event.data.text
        });
    }
};

module.exports = {initialState, commands, events };
