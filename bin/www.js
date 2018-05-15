'use strict'

require('dotenv').config()

const port = (process.env.NODE_PORT || 3000)
const app = require('../app')
const server = app.listen(port)

console.info(`Starting server in [ ${ process.env.NODE_ENV } ] environment`)

server.on('error', onError)
server.on('listening', onListening)

function onError(error) {
    if (error.syscall !== 'listen') throw error

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    let addr = server.address()
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port

    console.info('Listening on ' + bind)
}