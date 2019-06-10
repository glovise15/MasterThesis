FROM node:latest

# set working directory
RUN mkdir -p /app/src
WORKDIR /app/src

ENV HOST "http://172.25.0.1:"
ENV NOTE_QUERY_PORT 3121
ENV FOLLOW_QUERY_PORT 3113
ENV LIKE_QUERY_PORT 3121
ENV SHARE_QUERY_PORT 3125
ENV BLOCK_QUERY_PORT 3109
ENV USER_QUERY_PORT 3103
ENV ACTOR_QUERY_PORT 3106

# install app dependencies
ENV PATH /app/src/node_modules/.bin:$PATH
ADD package.json /app/src/package.json
RUN apt-get update
RUN npm install

ADD . /app/src

COPY docker-entrypoint.sh /
#ip a | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1
# start app
#ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]
