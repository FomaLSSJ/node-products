'use strict'

require('dotenv').config()

const _ = require('lodash')
const Database = require('../modules/database')
const emitter = require('../modules/emitter')

class Seeder {
    constructor() {
        this.init()
    }

    async init() {
        await Database.init()
        emitter.on('dbinit', this.process)
    }

    async process() {
        try {
            const products = await Database.get().listCollections().toArray()
            
            if (_.find(products, { name: 'products' })) await Database.get().dropCollection('products')
            await Database.get().createCollection('products', {
                validator: {
                    bsonType: 'object',
                    required: [ 'id', 'name', 'description', 'price' ],
                    properties: {
                        id: { bsonType: 'number' },
                        name: { bsonType: 'string' },
                        description: { bsonType: 'string' },
                        price: { bsonType: 'number' }
                    }
                },
                validationAction: 'warn',
                validationLevel: 'strict'
            })
            await Database.get('products').createIndex({ id: 1 }, { unique: true })
            await Database.get('products').insertMany([
                { id: 1, name: 'Product #1', description: 'Product description #1', price: 50.0 },
                { id: 2, name: 'Product #2', description: 'Product description #2', price: 150.0 },
                { id: 3, name: 'Product #3', description: 'Product description #3', price: 100.0 },
                { id: 4, name: 'Product #4', description: 'Product description #4', price: 200.0 },
                { id: 5, name: 'Product #5', description: 'Product description #5', price: 250.0 }
            ])

            process.exit(0)
        } catch(err) {
            console.error(err)
            process.exit(1)
        }
    }
}

module.exports = new Seeder()