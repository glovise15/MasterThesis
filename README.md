# Installation guide

The first step is to retrieve the repository hosted on git:
```
$ git clone https://github.com/glovise15/MasterThesis.git
```
Once the project has been cloned, the following modules must be installed: [npm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04),  [node](https://joshtronic.com/2018/05/08/how-to-install-nodejs-10-on-ubuntu-1804-lts/) (10.x),  [docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/),  and [docker-compose](https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04). The next step is to move to the *services* folder and install the different libraries through this command:
```
$ sudo ./npm-install.sh
```
The script will take a few minutes to complete as it will install every **npm** dependency for each service. Once the installation is done, the last step is to launch the containers:
```
$ sudo docker-compose up
```
This will take around 30 minutes as all the docker images must be mounted. Once everything is done, you can execute the tests scenarios in the *scenarios* folder. Before doing so, make sure you have [artillery](https://artillery.io/) installed:
```
$ npm install -g artillery
```
Scenarios can then be tested like this:
```
$ artillery run testName.yml
```
## Common issues
If you encounter issues at any time during the installation, try executing each command as root (**sudo**). If you face issues during deployment with Wolkenkit or with services not managing to connect to the event-store (problem with ConfiguraitonWatcher), try changing the **HOST** variable to your machine address. This variable can be found in the *services/.env* file and you can obtain your address with the following command:
```
ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1
```
