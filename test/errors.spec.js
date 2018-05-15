/* global it, describe, chai, app, assert */
'use strict'

describe('Errors', () => {
    it('get not allowed path, status 404', done => {
        chai
            .request(app)
            .get('/api/wrongpath')
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.equal(status, 404)
                assert.hasAnyKeys(body, [ 'error' ])
                assert.hasAnyKeys(body.error, [ 'type', 'message' ])
                assert.equal(body.error.type, 'invalid_request_error')
                assert.equal(body.error.message, 'Unable to resolve the request "/api/wrongpath".')
                done()
            })
    })

    it('send empty "product_id" and "quantity" that are required, status 400', done => {
        chai
            .request(app)
            .post('/api/cart')
            .send({})
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.equal(status, 400)
                assert.isObject(body)
                assert.hasAnyKeys(body, [ 'error' ])
                assert.hasAnyKeys(body.error, [ 'type', 'message', 'params' ])
                assert.equal(body.error.type, 'invalid_param_error')
                assert.equal(body.error.message, 'Invalid data parameters.')
                assert.equal(body.error.params.length, 2)
                assert.deepInclude(body.error.params, { name: 'product_id', code: 'required', message: 'product_id cannot be blank.' })
                assert.deepInclude(body.error.params, { name: 'quantity', code: 'required', message: 'quantity cannot be blank.' })
                done()
            })
    })

    it('send correct "product_id" and empty "quantity", status 400', done => {
        chai
            .request(app)
            .post('/api/cart')
            .send({ product_id: 1 })
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.equal(status, 400)
                assert.isObject(body)
                assert.hasAnyKeys(body, [ 'error' ])
                assert.hasAnyKeys(body.error, [ 'type', 'message', 'params' ])
                assert.equal(body.error.type, 'invalid_param_error')
                assert.equal(body.error.message, 'Invalid data parameters.')
                assert.equal(body.error.params.length, 1)
                assert.deepInclude(body.error.params, { name: 'quantity', code: 'required', message: 'quantity cannot be blank.' })
                done()
            })
    })

    it('send not valid "quantity", status 400', done => {
        chai
            .request(app)
            .post('/api/cart')
            .send({ product_id: 1, quantity: 25 })
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.equal(status, 400)
                assert.isObject(body)
                assert.hasAnyKeys(body, [ 'error' ])
                assert.hasAnyKeys(body.error, [ 'type', 'message', 'params' ])
                assert.equal(body.error.type, 'invalid_param_error')
                assert.equal(body.error.message, 'Invalid data parameters.')
                assert.equal(body.error.params.length, 1)
                assert.deepInclude(body.error.params, { name: 'quantity', code: 'not_valid', message: 'quantity not validation.' })
                done()
            })
    })

    it('get internal server error, status 500', done => {
        chai
            .request(app)
            .post('/api/cart')
            .send({ product_id: 6, quantity: 3 })
            .end((err, { status, body }) => {
                assert.isNull(err)
                assert.equal(status, 500)
                assert.hasAnyKeys(body, [ 'error' ])
                assert.hasAnyKeys(body.error, [ 'type', 'message' ])
                assert.equal(body.error.type, 'internal_server_error')
                assert.equal(body.error.message, 'Unable to resolve the request.')
                done()
            })
        
    })
})