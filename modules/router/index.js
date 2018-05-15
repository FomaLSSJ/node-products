'use strict'

const Router = require('express').Router
const productsRouter = require('./api/products')
const cartRouter = require('./api/cart')

class IndexRouter {
    constructor() {
        this.router = Router()
        this.init()
        this.instance
    }

    init() {
        this.router
            .use('/api', productsRouter)
            .use('/api', cartRouter)
    }
}

module.exports = new IndexRouter().router