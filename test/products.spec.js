/* global it, describe, chai, app, assert */
'use strict'

describe('Products', () => {
    it('get all products package', done => {
        chai
            .request(app)
            .get('/api/products')
            .end((err, res) => {
                assert.isNull(err)
                assert.isNotEmpty(res.body)
                assert.isObject(res.body)
                assert.hasAnyKeys(res.body, [ 'data' ])
                assert.isArray(res.body.data)
                assert.equal(res.body.data.length, 5)
                done()
            })
    })
})