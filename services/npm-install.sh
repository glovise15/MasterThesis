#!/usr/bin/env bash
cd gateway && npm install && cd ..
cd user/userCommand && npm install && cd ..
cd userQuery && npm install && cd ../..

cd actor/actorCommand && npm install && cd ..
cd actorQuery && npm install && cd ../..

cd outbox/blockOutbox && npm install && cd ..
cd followOutbox && npm install && cd ..
cd likeOutbox && npm install && cd ..
cd noteOutbox && npm install && cd ..
cd shareOutbox && npm install && cd ../..

cd inbox/command/blockInbox && npm install && cd ..
cd followInbox && npm install && cd ..
cd likeInbox && npm install && cd ..
cd noteInbox && npm install && cd ..
cd outboxCollection && npm install && cd ..
cd shareInbox && npm install && cd ../..

cd databaseQuerier/blockQuerier && npm install && cd ..
cd followQuerier && npm install && cd ..
cd likeQuerier && npm install && cd ..
cd noteQuerier && npm install && cd ..
cd shareQuerier && npm install && cd ../..
cd eventStore && npm install -g wolkenkit@3.1.0 && wolkenkit start
echo "If the wolkenkit application installation failed, move to services/inbox/eventStore and run:"
echo "sudo npm install -g wolkenkit@3.1.0" && echo "sudo wolkenkit start"