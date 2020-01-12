require('dotenv').config()

const log = require('./log')
const express = require('express')
const next = require('next')
const proxy = require('http-proxy-middleware')

const { PORT, PROXY_PORT, NODE_ENV } = process.env
    
const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare().then(() => {
    const server = express()
    
    server.use(
        '/api',
        proxy({ 
            target: `http://localhost:${PROXY_PORT}`, 
            changeOrigin: true 
        })
    )
        
    server.get('*', handle)
        
    server.listen(PORT, (err) => {
        if (err) throw err
        log.success('server.js', `Next.js ready on http://localhost:${PORT}`)
    })

    log.success('server.js', 'API Proxy configured.')
}).catch(error => {
    log.error('server.js', 'Failed to start Next.js', error)
    process.exit(1)
})