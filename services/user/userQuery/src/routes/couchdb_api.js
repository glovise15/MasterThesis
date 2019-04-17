const log = require('debug')('user-db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//const userDB = require('nano')(process.env.COUCHDB_DB_URL)
//console.log(process.env.COUCHDB_DB_URL)
const userDB = require('nano')("http://admin:admin@user-db:5984/user")

const key = "2URIWeWGe5s14OptNidOyP"


//LOGIN
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

function comparePass (userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword)

}

function ensureAuthenticated (req) {
    return new Promise((resolve, reject) => {
        var username = req.params.username
        var token = req.params.token

        if (!token || !username) {
            log('user request has no token')
            reject(new Error(`No token for user ${req.params.username}`))
        }

        jwt.verify(token,key, function(err, decoded) {
            if (err) {
                console.log(err)
                reject(new Error(`Token for ${req.params.username} is not valid`));
            } else resolve(true)
        });
    })
}


module.exports = {
    getUser,
    comparePass,
    ensureAuthenticated,
    key
}