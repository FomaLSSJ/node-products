'use strict'

const _ = require('lodash')
const Database = require('../../database')
const Errors = require('../../errors')

class ProductController {
    static async get(req, res) {
        const products = await Database.get('products').find({}, { fields: { _id: 0 } }).toArray()
        if (_.isEmpty(products)) return res.status(500).json(Errors.error500())
        return res.json({ data: products })
    }
}

module.exports = ProductController