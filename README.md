# ActivityPub protocol implementation 2.0

## Services documentation
	
### User
	
- **Role :** This service handles the authentication of users as well the creation. According to the CQRS pattern, I will probably need to create a separate API for the creation of users. I will need to familiarize myslef with the OpenID protocol before decinding on how to proceed.
- **Technologies :** [OpenID Connect 1.0](https://openid.net/connect/) is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner. The node.js implementation can foud [here](https://www.npmjs.com/package/oidc-provider#get-started).
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /user | username=[string] & password=[string] | Authentication token | Register a new user |
	| GET | /user/:username/:password | - | Authentication token | Log in a user |
	| GET | /user/:username/:token/authorization | - | - | Checks if an authentication token is still valid |
- **Additional information :** This service will be among the last to be implemented as the priority is on the ActivityPub protocol implementation.	Depending on the protocol this might be divided in two protocols to follow the CQRS pattern.

### ActorCommand
	
- **Role :** This command service handles the CRUD operations on actors.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /actor/create | actorname=[string] & username=[string] & information=[activityStreams] | - | Create a new actor for an user |
	| POST | /actor/update | actorname=[string] & information=[activityStreams] | - | Update an existing actor |
	| POST | /actor/delete | actorname=[string] | - | Delete an existing actor |	
	
### Outbox

The outbox set of services receives request from the actors, usually through the front-end service, to send activities to other actors. In short, the client send data to the server to handle the delivery.

#### NoteOutbox

- **Role :** This command service handles the outbox for CRUD operations on a note object. A note is the synonym for a post on twitter.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /outbox/create | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Creation of an activity.
	| POST | /outbox/update | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Update of an activity already existing.
	| POST | /outbox/delete | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Removal of an activity already existing.
	| POST | /outbox/note/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo the last action on a note.
	
#### LikeOutbox

- **Role :** This command service handles the outbox for like objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /outbox/like | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Like an object.
	| POST | /outbox/like/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous like.
	
#### FollowOutbox

- **Role :** This command service handles the outbox for follow objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /outbox/follow | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Subscribe to the activities of another actor.
	| POST | /outbox/follow/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous follow.
	
#### ShareOutbox

- **Role :** This command service handles the outbox for share objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /outbox/share | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Share/repost the actvity of another actor.
	| POST | /outbox/share/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous share.
	
#### BlockOutbox

- **Role :** This command service handles the outbox for block objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /outbox/block | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
	| POST | /outbox/block/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous block.


### Inbox

- **Role :** The inbox set of services receives request from the servers, usually through their outbox services, to deliver activties to actors' inboxes. Once a request is processed, these services all publish them on the event bus to be persisted in the event store.
- **Technologies :** [Wolkenkit](https://www.wolkenkit.io/)

#### NoteInbox
	
- **Role :** This command service handles the inbox for CRUD operations on a note object. A note is the synonym for a post on twitter.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/create | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Creation of an activity.
	| POST | /inbox/update | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Update of an activity already existing.
	| POST | /inbox/delete | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Removal of an activity already existing.
	| POST | /inbox/note/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo the last action on a note.	
	
#### LikeInbox

- **Role :** This command service handles the inbox for like objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/like | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Like an object.
	| POST | /inbox/like/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous like.
	
#### FollowInbox

- **Role :** This command service handles the inbox for follow objects. When actor A follow actor B, A is added to the following collection of B and B is added to the followed collection of A.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/follow | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Subscribe to the activities of another actor.
	| POST | /inbox/follow/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous follow.
	| POST | /inbox/follow/accept | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Accept a following  for a follow activity sent previously.
	| POST | /inbox/follow/reject | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Reject a following for a follow activity sent previously.
#### ShareInbox

- **Role :** This command service handles the inbox for share objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/share | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Share/repost the actvity of another actor.
	| POST | /inbox/share/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous share.
	
#### BlockInbox

- **Role :** This command service handles the inbox for block objects.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/block | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
	| POST | /inbox/block/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous block.
	
#### InboxCollection

- **Role :** This command service handles the inbox collection containing all activities received by the actor.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/in/add | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Add the object in the collection specified in the target property.
	| POST | /inbox/in/remove | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Remove the object in the collection specified in the target property.
	| POST | /inbox/in/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous add or remove operations.
- **Additional information :** This service handle the inbox property of an actor, containing all the activities that he received in his inbox. This is basically an aggregate of the all the database in the Inbox set of service.

#### OutboxCollection

- **Role :** This command service handles the outbox collection containing all activities sent by the actor.
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| POST | /inbox/out/add | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Add the object in the collection specified in the target property.
	| POST | /inbox/out/remove | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Remove the object in the collection specified in the target property.
	| POST | /inbox/out/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous add or remove operations.	
- **Additional information :** This service handle the outbox property of an actor, containing all the activities that he put in his outbox. 
	
### DatabaseQuerier

- **Role :** This query service handles the storage of last known state of each objects in a database. Each services in this set is subscribed to a specific topic. When a new event for an object is received, these services will reconstruct the object based on all the events in the event store and then persist it in the database.
- **Technologies :** [Wolkenkit](https://www.wolkenkit.io/)
	
#### NoteQuerier

- **Role :** This query service is subscribed to the "Note" topic. 
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| GET | /noteDB/object/:actorname/:objectId/:token | - | jsonObject[activityStreams] | Get the last state of [objectId] (all if not specified).

#### LikeQuerier

- **Role :** This query service is subscribed to the "Like" topic. 
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| GET | /inbox/like/:actorname/:token | - | jsonObject[activityStreams] | Get the list of liked objects.
	
#### FollowQuerier

- **Role :** This query service is subscribed to the "Follow" topic. 
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| GET | /inbox/followed/:actorname/:token | - | jsonObject[activityStreams] | Get the list of followed actors.
	| GET | /inbox/following/:actorname/:token | - | jsonObject[activityStreams] | Get the list of following actors.
	
#### ShareQuerier

- **Role :** This query service is subscribed to the "Share" topic. 
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| GET | /inbox/Share/:actorname/:token | - | jsonObject[activityStreams] | Get the list of shared objects.
	
#### BlockQuerier

- **Role :** This query service is subscribed to the "Block" topic. 
- **API :**
	| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
	|------|-----------------------------|-------------------------------------|--------------------|--------------------------------------------------|
	| GET | /inbox/block/:actorname/:token | - | jsonObject[activityStreams] | Get the list of blocked actors.
	
	
### HistoryQuerier
- **Role :** This query service handle the distribution of previous versions of data. To be implemented.

## Delivery and other details
	
An activity is delivered to the inboxes of all the actors mentionned in the to, bto, cc, bcc and audience fields of the activity. We must also always deliver an activity to the sender's follower collection (de-duplication needed). If an activity is sent to the "public" collection, it is not delivered to any actors but viewable by all in the actor's outbox. An activity in an outbox is always delivered to the appropriate inboxes but also added in the sender's outbox collection (through the OutboxCollection API).

## Doubts
I haven't really thought about how to implement the filter feature, I have to look into it a bit more (Mastodon's API seems to also be using a filter, I plan on doing some research on that).
Whenever someone want to see the whole inbox of an actor we can either aggregate all the data in the databases of the Inbox's set of service for that actor or we can have the service InboxCollection which is a redudant database storing all the activities received by that actor. I'm not sure which of these two solutions is the best.
