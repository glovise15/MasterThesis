const log = require('debug')('user-db')
const bcrypt = require('bcryptjs')
//const userDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const userDB = require('nano')("http://admin:admin@user-db:5984/user")

/*
    Insert the new user in the database
        String username : the name of the new user
        String password : the password of the new user
    @return -> boolean
 */
function createUser (req) {
    var username = req.body.username
    var password = req.body.password
    console.log('createUser()')

    // Hash the password with bcryptjs
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(password, salt)
    return new Promise((resolve, reject) => {
        userDB.insert({password:hash}, username, (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve(username)
        })
    })
}

module.exports = {
    createUser
}