'use strict'

const Errors = require('../errors')

class Middleware {
    static init(router) {
        router.use('*', (req, res) => res.status(404).json(Errors.error404(req.baseUrl)))
    }
}

module.exports = Middleware