require('dotenv').config()

const path = require('path')
const cookieParserMiddleware = require('cookie-parser')
const express = require('express')
const routes = require('./routes')
const wsMiddleware = require('./middleware/ws-middleware')
const cardsMiddleware = require('./middleware/cards-middleware')
const log = require('../log')
const config = require('../config')
const app = express()

const { NODE_ENV } = process.env

app.use( 
    express.json(),
    cookieParserMiddleware(),
    cardsMiddleware,
    wsMiddleware,
)

app.use( '/api', routes )

if (NODE_ENV === 'development') {
    app.listen(config.backendPort)
    log.success('api/index.js', `Development server started on port ${config.backendPort}`)
} else {
    app.use('/', express.static(path.resolve('out')))
    app.use('*', (req, res) => res.sendFile(path.resolve('out', 'index.html')))
    app.listen(config.port)
    log.success('api/index.js', `Production server started on port ${config.port}`)
}