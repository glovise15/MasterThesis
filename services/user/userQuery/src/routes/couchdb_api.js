const log = require('debug')('user-db')
//const userDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const userDB = require('nano')("http://admin:admin@user-db:5984/user")

/*
    Retrieve [username] in the database
        String username : the name of the user
    @return -> {username, password}
 */
function getUser (username) {
    return new Promise((resolve, reject) => {
        userDB.get(username, (ko, ok) => {
            if (ko) {
                console.log(ko.reason)
                reject(ko.reason)
            } else resolve({id: ok._id, password: ok.password})
        })
    })
}


module.exports = {
    getUser
}