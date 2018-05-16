'use strict'

const _ = require('lodash')
const Database = require('../../database')
const Errors = require('../../errors')

class CartController {
    static async get(req, res) {
        CartController.sessionInit(req.session)

        const { total_sum, products_count, products } = req.session

        return res.json({ total_sum: total_sum, products_count: products_count, products: products })
    }

    static async post(req, res) {
        CartController.sessionInit(req.session)

        let { product_id, quantity } = req.body
        let errors = []

        if (_.isUndefined(product_id)) errors.push(Errors.errorDetail(1, 'product_id'))
        if (_.isUndefined(quantity)) errors.push(Errors.errorDetail(1, 'quantity'))
        if (Number(quantity) < 1 || Number(quantity) > 10) errors.push(Errors.errorDetail(2, 'quantity'))
        if (!_.isEmpty(errors)) return res.status(400).json(Errors.error400(errors))

        product_id = Number(product_id)
        quantity = Number(quantity)

        const product = await Database.get('products').findOne({ id: product_id })
        if (!product) return res.status(500).json(Errors.error500())

        let { session } = req

        session.total_sum += product.price * quantity
        session.products_count += quantity
        let sessionProduct = _.find(session.products, { id: product.id })
        if (sessionProduct) {
            sessionProduct.quantity += quantity
            sessionProduct.sum += product.price * quantity
        } else {
            session.products.push({ id: product.id, quantity: quantity, sum: product.price * quantity })
        }

        return res.json({ data: { success: true } })
    }

    static async delete(req, res) {
        CartController.sessionInit(req.session)

        let { session } = req
        let { product_id } = req.params
        let errors = []

        if (!product_id) errors.push(Errors.errorDetail(1, 'product_id'))
        if (!_.isEmpty(errors)) return res.status(400).json(Errors.error400(errors))
        product_id = Number(product_id)

        const product = await Database.get('products').findOne({ id: product_id })
        if (!product) return res.status(500).json(Errors.error500())

        let sessionProduct = _.find(session.products, { id: product_id })
        if (!sessionProduct) return res.json({ data: { success: true } })
        if (sessionProduct.quantity === 1) {
            _.remove(session.products, { id: product_id })
        } else {
            sessionProduct.quantity -= 1
            sessionProduct.sum -= product.price
        }
        session.total_sum -= product.price
        session.products_count -= 1

        return res.json({ data: { success: true } })
    }

    static sessionInit(session) {
        if (!session.total_sum) session.total_sum = 0
        if (!session.products_count) session.products_count = 0
        if (!session.products) session.products = []
    }
}

module.exports = CartController