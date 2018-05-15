/* global describe, before, emitter, chai, chaiHttp */
'use strict'

require('dotenv').config()

process.env.NODE_ENV = 'test'

global.app = require('../app')
global.emitter = require('../modules/emitter')
global.chai = require('chai')
global.chaiHttp = require('chai-http')
global.assert = chai.assert

chai.use(chaiHttp)

describe('Testing' , () => {
    before(done => emitter.on('dbinit', () => done()))

    require('./errors.spec')
    require('./products.spec')
    require('./cart.spec')
})