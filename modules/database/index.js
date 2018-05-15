'use strict'

const mongodb = require('mongodb')
const emitter = require('../emitter')
const MongoClient = mongodb.MongoClient
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DBNAME } = process.env
const URL = MONGO_USER && MONGO_PASS
    ? `mongodb://${ MONGO_USER }:${ MONGO_PASS }@${ MONGO_HOST }:${ MONGO_PORT }/${ MONGO_DBNAME }`
    : `mongodb://${ MONGO_HOST }:${ MONGO_PORT }/${ MONGO_DBNAME }`

let database = null

class Database {
    static init() {
        MongoClient.connect(URL, { useNewUrlParser: true })
            .then(client => {
                database = client.db(MONGO_DBNAME)
                emitter.emit('dbinit')
            })
            .catch(err => console.error('[ Database error ]', err))
    }

    static castObjectId(id) {
        return new mongodb.ObjectId(id);
    }

    static get(name) {
        return name ? database.collection(name) : database
    }
}

module.exports = Database