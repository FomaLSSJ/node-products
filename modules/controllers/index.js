'use strict'

const ProductController = require('./api/product')
const CartController = require('./api/cart')

class Controllers {
    static get Product() {
        return ProductController
    }

    static get Cart() {
        return CartController
    }
}

module.exports = Controllers