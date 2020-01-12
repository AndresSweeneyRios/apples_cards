const router = require('express').Router()

router.get('/helloworld', (req, res) => {
    res.send('Hello world!')
})

module.exports = router
