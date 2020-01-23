const router = require('express').Router()

const log = require('../../log')

router.get('/create', ({ ws, cookies, cards, blackDeck, whiteDeck }, res) => {
    const getOwner = () => {
        const { nickname, id } = cookies
        return { nickname, id }
    }

    const owner = getOwner()

    if (!owner.nickname || !owner.id) return res.status(401).send('please set your nickname')

    const generateUniqueId = () => {
        const id = Math.random().toString(36).substr(2,4)
        return ws.rooms[id] ? generateUniqueId() : id
    }

    const id = generateUniqueId() 

    ws.rooms[id] = {
        owner,
        players: [],
        clients: [],
        hands: [],
        id,

        blackDeck: blackDeck(),
        whiteDeck: whiteDeck(),

        blackCard: {
            text: '',
            picks: 0,
        },

        whiteCards: [],

        timer: 0,
        czar: 0,

        started: false,

        locked: false,

        chat: [],

        message (content) {
            this.chat.push({
                server: true,
                content,
            })

            this.broadcast('message', { content, server: true })
        },

        broadcast (event, data) {
            this.clients.forEach(({ reply }) => {
                try { reply(event, data) }
                catch {}
            })
        },

        safe () {
            const { owner, players, id, timer, czar, started, locked, chat, blackCard } = this
            return { owner, players, id, timer, czar, started, locked, chat, blackCard }
        }
    }

    res.json(ws.rooms[id].safe())

    log.success('api/routes/rooms.js', 'Room created')
})

router.get('/exists/:id', ({ ws, params }) => {
    res.json( Boolean(ws.rooms[params.id]) )
}) 

router.get('/connect', ({ ws, cookies }, res) => {
    const token = require('uuid/v1')()

    log.success('api/routes/rooms.js', 'Token requested')

    ws.on('connect', (conn, data) => {
        if (data.token === token) {
            conn.cookies = cookies
            conn.verified = true
            conn.reply('connected')

            log.success('api/routes/rooms.js', 'Token verified')

            return { clear: true }
        }
    })

    res.json({ token })
})

module.exports = router
