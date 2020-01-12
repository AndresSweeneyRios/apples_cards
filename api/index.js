require('dotenv').config()

const log = require('../log')
const path = require('path')
const express = require('express')
const routes = require('./routes')
const app = express()

const { NODE_ENV, PORT, PROXY_PORT } = process.env

if (NODE_ENV === 'development') {
    app.use('/api', routes);
    app.listen(PROXY_PORT)
    log.success('api/index.js', `Development server started on port ${PROXY_PORT}`)
} else {
    app.use('/api', routes);
    app.use('/', express.static(path.resolve('out')));
    app.use('*', (req, res) => res.sendFile(path.resolve('out', 'index.html')));
    app.listen(PORT)
    log.success('api/index.js', `Production server started on port ${PORT}`)
}