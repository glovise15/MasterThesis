# ActivityStreams for ActivityPub summary
## Actor
```
{
  "@context": ["https://www.w3.org/ns/activitystreams",
               {"@language": "ja"}],
  "type": "Person",
  "id": "https://kenzoishii.example.com/",
  "following": "https://kenzoishii.example.com/following.json",
  "followers": "https://kenzoishii.example.com/followers.json",
  "liked": "https://kenzoishii.example.com/liked.json",
  "inbox": "https://kenzoishii.example.com/inbox.json",
  "outbox": "https://kenzoishii.example.com/feed.json",
  "preferredUsername": "kenzoishii",
  "name": "kenzoishii",
  "summary": "",
  "icon": [
    "https://kenzoishii.example.com/image/165987aklre4"
  ]
}
```
## Activity
### Send Like
```
{
"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Like",
 "id": "https://social.example/alyssa/posts/5312e10e-5110-42e5-a09b-934882b3ecec",
 "to": ["https://chatty.example/ben/"],
 "actor": "https://social.example/alyssa/",
 "object": "https://chatty.example/ben/p/51086"
}
```
### Receive Post
```
{
"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Create",
 "id": "https://chatty.example/ben/p/51086",
 "to": ["https://social.example/alyssa/"],
 "actor": "https://chatty.example/ben/",
 "object":  {
            "type": "Note",
            "id": "https://chatty.example/ben/p/51085",
            "attributedTo": "https://chatty.example/ben/",
            "to": ["https://social.example/alyssa/"],
            "inReplyTo": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
            "content": "<p>Argh, yeah, sorry, I'll get it back to you tomorrow.</p>
                        <p>I was reviewing the section on register machines,
                           since it's been a while since I wrote one.</p>"
            }
}
```
### Send to public Collection
```
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "id": "https://www.w3.org/ns/activitystreams#Public",
  "type": "Collection"
}
```
## Non-Activity
```
{
"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Note",
 "to": ["https://chatty.example/ben/"],
 "attributedTo": "https://social.example/alyssa/",
 "content": "Say, did you finish reading that book I lent you?"
}
```
Server wraps the object in a Create activity
```
{
"@context": "https://www.w3.org/ns/activitystreams",
 "type": "Create",
 "id": "https://social.example/alyssa/posts/a29a6843-9feb-4c74-a7f7-081b9c9201d3",
 "to": ["https://chatty.example/ben/"],
 "actor": "https://social.example/alyssa/",
 "object":  {
            "type": "Note",
            "id": "https://social.example/alyssa/posts/49e2d03d-b53a-4c4c-a95c-94a6abf45a19",
            "attributedTo": "https://social.example/alyssa/",
            "to": ["https://chatty.example/ben/"],
            "content": "Say, did you finish reading that book I lent you?"
            }
}
```