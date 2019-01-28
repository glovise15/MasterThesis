const log = require('debug')('user-db')
const bcrypt = require('bcryptjs')
const userDB = require('nano')(process.env.COUCHDB_DB_URL)

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
        var token = req.params.token
        if (!token) {
            log('user request has no token')
            reject(new Error(`No token for user ${req.params.username}`))
        }
        /*if (err) {
            log('token has expired')
            reject(new Error(`Token for ${req.params.username} has expired`))
        }*/

        userDB.get(parseInt(payload.sub, 10), (ko, ok) => {
            if (ko) {
                log(ko)
                reject(ko.reason)
            } else resolve()
        })
    })
}


module.exports = {
    getUser,
    comparePass,
    ensureAuthenticated
}