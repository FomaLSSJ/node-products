'use strict'

const Events = require('events')
const events = new Events.EventEmitter()

class Emitter {
    static get instance() {
        return events
    }
}

module.exports = Emitter.instance