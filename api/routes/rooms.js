const router = require('express').Router()

const log = require('../../log')

router.get('/create', ({ ws, cookies, cards }, res) => {
    const getOwner = () => {
        const { nickname, id } = cookies
        return { nickname, id }
    }

    const owner = getOwner()

    if (!owner.nickname || !owner.id) return res.status(401).send('please set your nickname')

    const generateUniqueId = () => {
        const id = Math.random().toString(36).substr(2,6)
        return ws.rooms[id] ? generateUniqueId() : id
    }

    const id = generateUniqueId() 

    ws.rooms[id] = {
        owner,
        players: [],
        clients: [],
        id,

        blackDeck: cards.blackDeck(),
        whiteDeck: cards.whiteDeck(),

        blackCard: null,
        whiteCards: [],

        timer: 0,
        czar: 0,

        locked: false,

        chat: [],

        message (content) {
            this.chat.push({
                server: true,
                content,
            })

            this.broadcast({
                event: 'message',
                data: {
                    content
                },
            })
        },

        broadcast (json) {
            this.clients.forEach(({ reply })  => reply(json))
        },

        safe () {
            const { owner, players, id, timer, czar, locked, chat } = this
            return { owner, players, id, timer, czar, locked, chat }
        }
    }

    res.json(ws.rooms[id].safe())

    log.success('api/routes/rooms.js', 'Room created')
})

router.get('/connect', ({ ws, cookies }, res) => {
    const token = require('uuid/v1')()

    log.success('api/routes/rooms.js', 'Token requested')

    ws.on('connect', (conn, data) => {
        if (data.token === token) {
            conn.cookies = cookies
            conn.verified = true
            conn.reply({ event: 'connected' })

            log.success('api/routes/rooms.js', 'Token verified')

            return { clear: true }
        }
    })

    res.json({ token })
})

module.exports = router
