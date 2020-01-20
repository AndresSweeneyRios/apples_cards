const router = require('express').Router()

router.get('/set/:nickname', (req, res) => {
    const { nickname } = req.params

    if (nickname.length > 64) return res.status(400).send('maximum length for nicknames is 64')

    res.cookie('nickname', nickname)

    const id = require('uuid/v1')()

    res.cookie('id', id)

    res.json({ nickname })
})

router.get('/get', (req, res) => {
    const { nickname, id } = req.cookies

    if (!nickname || !id) return res.status(401).send('must be authorized')

    res.json({ nickname })
})

module.exports = router
