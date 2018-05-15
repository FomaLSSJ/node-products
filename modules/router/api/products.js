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
            .get('/products', Controllers.Product.get)
    }
}

module.exports = new ProductRouter().router