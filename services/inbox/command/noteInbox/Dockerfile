FROM node:latest

# set working directory
RUN mkdir -p /app/src
WORKDIR /app/src

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
