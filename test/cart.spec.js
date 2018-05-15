/* global it, describe, chai, app, assert */
'use strict'

describe('Cart', () => {
    it('get blank session data', done => {
        chai
            .request(app)
            .get('/api/cart')
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.isObject(body)
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 0)
                assert.equal(body.products_count, 0)
                assert.isEmpty(body.products)
                done()
            })
    })

    it('append package #1 in the quantity of 2', done => {
        const agent = chai.request.agent(app)

        agent
            .post('/api/cart')
            .send({ product_id: 1, quantity: 2 })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 100)
                assert.equal(body.products_count, 2)
                assert.deepInclude(body.products, { id: 1, quantity: 2, sum: 100 })
                done()
            })
            .catch(err => {
                assert.isNull(err)
                done()
            })
    })

    it('append package #1 in the quantity of 4 and package #2 in the quantity 2', done => {
        const agent = chai.request.agent(app)

        agent
            .post('/api/cart')
            .send({ product_id: 1, quantity: 4 })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.post('/api/cart').send({ product_id: 2, quantity: 2 })
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 500)
                assert.equal(body.products_count, 6)
                assert.deepInclude(body.products, { id: 1, quantity: 4, sum: 200 })
                assert.deepInclude(body.products, { id: 2, quantity: 2, sum: 300 })
                done()
            })
            .catch(err => {
                assert.isNull(err)
                done()
            })
    })

    it('append package #1 in the quantity of 2 and remove package', done => {
        const agent = chai.request.agent(app)

        agent
            .post('/api/cart')
            .send({ product_id: 1, quantity: 2 })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.delete('/api/cart/1')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 50)
                assert.equal(body.products_count, 1)
                assert.deepInclude(body.products, { id: 1, quantity: 1, sum: 50 })
                done()
            })
            .catch(err => {
                assert.isNull(err)
                done()
            })
    })

    it('append package #1 and #2 in the quantity of 1, remove package #1', done => {
        const agent = chai.request.agent(app)

        agent
            .post('/api/cart')
            .send({ product_id: 1, quantity: 1 })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 50)
                assert.equal(body.products_count, 1)
                assert.deepInclude(body.products, { id: 1, quantity: 1, sum: 50 })
                return agent.post('/api/cart').send({ product_id: 2, quantity: 1 })
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 200)
                assert.equal(body.products_count, 2)
                assert.deepInclude(body.products, { id: 1, quantity: 1, sum: 50 })
                assert.deepInclude(body.products, { id: 2, quantity: 1, sum: 150 })
                return agent.delete('/api/cart/1')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'data' ])
                assert.hasAnyKeys(body.data, [ 'success' ])
                assert.equal(body.data.success, true)
                return agent.get('/api/cart')
            })
            .then(({ status, body }) => {
                assert.equal(status, 200)
                assert.hasAnyKeys(body, [ 'total_sum', 'products_count', 'products' ])
                assert.equal(body.total_sum, 150)
                assert.equal(body.products_count, 1)
                assert.deepInclude(body.products, { id: 2, quantity: 1, sum: 150 })
                done()
            })
            .catch(err => {
                assert.isNull(err)
                done()
            })
    })
})