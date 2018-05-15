'use strict'

const ProductController = require('./product')
const CartController = require('./cart')

class Controllers {
    static get Product() {
        return ProductController
    }

    static get Cart() {
        return CartController
    }
}

module.exports = Controllers