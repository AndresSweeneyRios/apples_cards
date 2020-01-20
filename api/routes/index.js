const router = require('express').Router()

router.use('/rooms', require('./rooms'))
router.use('/nickname', require('./nickname'))

module.exports = router
