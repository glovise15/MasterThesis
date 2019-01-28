FROM node:latest

# set working directory
RUN mkdir -p /app/src
WORKDIR /app/src

# install app dependencies
ENV PATH /app/src/node_modules/.bin:$PATH
ENV DB_HOST user-db
ENV COUCHDB_PORT 5984
ENV COUCHDB_DB_URL http://admin:admin@${DB_HOST}:${COUCHDB_PORT}/user
ENV TOKEN_SECRET i4mag00dT0K3n

ADD package.json /app/src/package.json

RUN apt-get update
RUN npm install

ADD . /app/src

# start app
CMD ["npm", "start"]