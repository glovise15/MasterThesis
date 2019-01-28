FROM node:latest

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV DB_HOST user-db
ENV COUCHDB_PORT 5984
ENV COUCHDB_DB_URL http://admin:admin@${DB_HOST}:${COUCHDB_PORT}/user

RUN apt-get update -y && apt-get install -y --no-install-recommends curl
RUN npm install debug

COPY views ./views
COPY func_to_string.js ./
COPY wait-for-couchdb.sh ./

RUN ["chmod", "+x", "./wait-for-couchdb.sh"]

CMD ["./wait-for-couchdb.sh"]