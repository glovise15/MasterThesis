const log = require('debug')('user-db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userDB = require('nano')(process.env.COUCHDB_DB_URL)
console.log(process.env.COUCHDB_DB_URL)

function createUser (req) {
    var username = req.body.username
    var password = req.body.password
    console.log('createUser()')
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