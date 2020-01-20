require('dotenv').config()

const path = require('path')
const cookieParserMiddleware = require('cookie-parser')
const express = require('express')
const routes = require('./routes')
const wsMiddleware = require('./middleware/ws-middleware')
const cardsMiddleware = require('./middleware/cards-middleware')
const log = require('../log')
const app = express()

const { NODE_ENV, PORT, PROXY_PORT } = process.env

app.use( 
    express.json(),
    cookieParserMiddleware(),
    cardsMiddleware,
    wsMiddleware,
)

app.use( '/api', routes )

if (NODE_ENV === 'development') {
    app.listen(PROXY_PORT)
    log.success('api/index.js', `Development server started on port ${PROXY_PORT}`)
} else {
    app.use('/', express.static(path.resolve('out')))
    app.use('*', (req, res) => res.sendFile(path.resolve('out', 'index.html')))
    app.listen(PORT)
    log.success('api/index.js', `Production server started on port ${PORT}`)
}