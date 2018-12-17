# ActivityPub protocol implementation 2.0

## Wolkenkit events

In wolkenkit, services are subscribed  to events that are published by specific commands :

- post -> posted : creation of a note.
- like -> liked : like of a note.
- share -> shared : share of a note.
- follow -> followed : follow an actor.
- block -> blocked : block an actor.

## Services documentation
	
### 1. User
	
- **Role :** This service handles the authentication of users as well the creation.
- **Technologies :** [OpenID Connect 1.0](https://openid.net/connect/) is a simple identity layer on top of the OAuth 2.0 protocol. It allows Clients to verify the identity of the End-User based on the authentication performed by an Authorization Server, as well as to obtain basic profile information about the End-User in an interoperable and REST-like manner. The node.js implementation can foud [here](https://www.npmjs.com/package/oidc-provider#get-started).

#### 1.1 UserCommand

- **API : 3101**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /user | username=[string] & password=[string] | Authentication token | Register a new user |

#### 1.2 UserQuery

- **API : 3102**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /user/:username/:password | - | Authentication token | Log in a user |
| GET | /user/:username/:token/authorization | - | - | Checks if an authentication token is still valid |

### 2. Actor
	
- **Role :** This service handles the actors which are sort of public identities of users.
#### 2.1 ActorCommand
	
- **Role :** This command service handles the CRUD operations on actors.
- **API : 3104**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |	
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /actor/create | actorname=[string] & username=[string] & information=[activityStreams] | - | Create a new actor for an user |
| POST | /actor/update | actorname=[string] & information=[activityStreams] | - | Update an existing actor |
| POST | /actor/delete | actorname=[string] | - | Delete an existing actor |	

#### 2.2 ActorQuery

- **Role :** This service handles the querying of actors' information.
- **API : 3105**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |	
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /actor/all/:username | Authentication token | jsonObject[ActivityStreams] | Get all of the actors available to [username] |
| GET | /actor/:actorname | Authentication token | jsonObject[ActivityStreams] | Get the information relative for [actorname] |

### 3. Outbox

The outbox set of services receives request from the actors, usually through the front-end service, to send activities to other actors. In short, the client send data to the server to handle the delivery.

#### 3.1 NoteOutbox

- **Role :** This command service handles the outbox for CRUD operations on a note object. A note is the synonym for a post on twitter.
- **API : 3119**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |	
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /note/create | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Creation of an activity.
| POST | /note/update | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Update of an activity already existing.
| POST | /note/delete | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Removal of an activity already existing.
| POST | /note/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo the last action on a note.
	
#### 3.2 LikeOutbox

- **Role :** This command service handles the outbox for like objects.
- **API : 3115**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /like | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Like an object.
| POST | /like/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous like.
	
#### 3.3 FollowOutbox

- **Role :** This command service handles the outbox for follow objects.
- **API : 3111**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /follow | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Subscribe to the activities of another actor.
| POST | /follow/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous follow.
	
#### 3.4 ShareOutbox

- **Role :** This command service handles the outbox for share objects.
- **API : 3123**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /share | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Share/repost the actvity of another actor.
| POST | /share/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous share.
	
#### 3.5 BlockOutbox

- **Role :** This command service handles the outbox for block objects.
- **API : 3107**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /block | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
| POST | /block/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous block.


### 4. Inbox

- **Role :** The inbox set of services receives request from the servers, usually through their outbox services, to deliver activties to actors' inboxes. Once a request is processed, these services all publish them on the event bus to be persisted in the event store.
- **Technologies :** [Wolkenkit](https://www.wolkenkit.io/)

#### 4.1 NoteInbox
	
- **Role :** This command service handles the inbox for CRUD operations on a note object. A note is the synonym for a post on twitter.
- **API : 3120**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /note/create | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Creation of an activity.
| POST | /note/update | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Update of an activity already existing.
| POST | /note/delete | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Removal of an activity already existing.
| POST | /note/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo the last action on a note.	
	
#### 4.2 LikeInbox

- **Role :** This command service handles the inbox for like objects.
- **API : 3116**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /like | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Like an object.
| POST | /like/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous like.
	
#### 4.3 FollowInbox

- **Role :** This command service handles the inbox for follow objects. When actor A follow actor B, A is added to the following collection of B and B is added to the followed collection of A.
- **API : 3112**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /follow | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Subscribe to the activities of another actor.
| POST | /follow/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous follow.
| POST | /follow/accept | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Accept a following  for a follow activity sent previously.
| POST | /follow/reject | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Reject a following for a follow activity sent previously.

#### 4.4 ShareInbox

- **Role :** This command service handles the inbox for share objects.
- **API : 3124**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /share | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Share/repost the actvity of another actor.
| POST | /share/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous share.
	
#### 4.5 BlockInbox

- **Role :** This command service handles the inbox for block objects.
- **API : 3108**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /block | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Block another actor from interacting with the objects we posted (not delivered to the targeted actor).
| POST | /block/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous block.

#### 4.6 OutboxCollection

- **Role :** This command service handles the outbox collection containing all activities sent by the actor.
- **API : 3127**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /outbox/add | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Add the object in the collection specified in the target property.
| POST | /outbox/remove | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Remove the object in the collection specified in the target property.
| POST | /outbox/undo | actorname=[string] & activity=[activityStream] & token=[string] & contenttype=[string] | - | Undo a previous add or remove operations.	
- **Additional information :** This service handle the outbox property of an actor, containing all the activities that he put in his outbox. 
	
### 5. DatabaseQuerier

- **Role :** This query service handles the storage of last known state of each objects in a database. Each services in this set is subscribed to a specific topic. When a new event for an object is received, these services will reconstruct the object based on all the events in the event store and then persist it in the database.
- **Technologies :** [Wolkenkit](https://www.wolkenkit.io/)
	
#### 5.1 NoteQuerier

- **Role :** This query service is subscribed to the "Note" topic. 
- **API : 3121**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /note/object/:actorname/:objectId/:token | - | jsonObject[activityStreams] | Get the last state of [objectId] (all if not specified).

#### 5.2 LikeQuerier

- **Role :** This query service is subscribed to the "Like" topic. 
- **API : 3117**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /like/:actorname/:token | - | jsonObject[activityStreams] | Get the list of liked objects.
	
#### 5.3 FollowQuerier

- **Role :** This query service is subscribed to the "Follow" topic. 
- **API : 3113**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /follow/followed/:actorname/:token | - | jsonObject[activityStreams] | Get the list of followed actors.
| GET | /follow/following/:actorname/:token | - | jsonObject[activityStreams] | Get the list of following actors.
	
#### 5.4 ShareQuerier

- **Role :** This query service is subscribed to the "Share" topic. 
- **API : 3125**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /share/:actorname/:token | - | jsonObject[activityStreams] | Get the list of shared objects.
	
#### 5.5 BlockQuerier

- **Role :** This query service is subscribed to the "Block" topic. 
- **API : 3109**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| GET | /block/:actorname/:token | - | jsonObject[activityStreams] | Get the list of blocked actors.
	

#### 5.6 OutboxCollectionQuerier

- **Role :** This query service is subscribed to the "Outbox" topic.
- **API : 3128**

| Method | Uniform Resource Name (URN) | Required  parameters | Output | Description |
|:------:|:-----------------------------|:-------------------------------------:|:--------------------:|:--------------------------------------------------|
| POST | /outbox/:actorname/:token | - | jsonObject[activityStreams] | Get all the actions done by actors.	
- **Additional information :** This service handle the outbox property of an actor, containing all the activities that he put in his outbox. 	
	
### 6. HistoryQuerier
- **Role :** This query service handle the distribution of previous versions of data. To be implemented.

### 7. UserInterface
- **Role :** This service handle the display of the user interface. It is subscribed to all topics as to update its data dynamically. It could be divided in multiple sub-services, to be determined.


## Delivery and other details
	
An activity is delivered to the inboxes of all the actors mentionned in the to, bto, cc, bcc and audience fields of the activity. We must also always deliver an activity to the sender's follower collection (de-duplication needed). If an activity is sent to the "public" collection, it is not delivered to any actors but viewable by all in the actor's outbox. An activity in an outbox is always delivered to the appropriate inboxes but also added in the sender's outbox collection (through the OutboxCollection API).

## To discuss

Implementation of gateway ?
Merge actors and users ?
