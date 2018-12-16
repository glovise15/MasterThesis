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

# start app
CMD ["npm", "start"]