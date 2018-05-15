'use strict'
const { NODE_SECRET } = process.env
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const Database = require('./modules/database')
const Middleware = require('./modules/middleware')
const router = require('./modules/router')

class App {
    constructor() {
        this.app = express()
        this.init()
    }

    async init() {
        await Database.init()
        await Middleware.init(router)

        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(session({
            secret: NODE_SECRET,
            cookie: { maxAge: 5 * 60 * 1000 },
            resave: true,
            saveUninitialized: true
        }))

        this.app.use('/', router)
    }
}

module.exports = new App().app