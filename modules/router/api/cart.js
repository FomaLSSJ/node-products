'use strict'

const Router = require('express').Router
const Controllers = require('../../controllers')

class ProductRouter {
    constructor() {
        this.router = Router()
        this.init()
    }

    init() {
        this.router
            .get('/cart', Controllers.Cart.get)
            .post('/cart', Controllers.Cart.post)
            .delete('/cart/:product_id', Controllers.Cart.delete)
    }
}

module.exports = new ProductRouter().router