module.exports = (conn, { room }, { rooms }) => {
    if (!conn.verified) return

    if (!rooms[room.id]) return conn.reply({
        event: 'error',
        data: {
            message: `invalid room id: ${room.id}`,
            fatal: true,
        }
    })

    conn.room = rooms[room.id]

    const { nickname, id } = conn.cookies

    if (
        conn.room.players.filter(
            player => id === player.id
        ).length > 0
    ) {
        conn.room.clients.splice(
            conn.room.clients.findIndex(
                ({ cookies }) => cookies.id === id
            ),
            1
        )

        conn.reply({
            event: 'deal',
            data: {
                room: conn.room.safe(),
                cards: conn.room.hands.find( hand => hand.id === id ).cards,
            }
        })
    } else {
        conn.room.players.push({ 
            nickname, 
            id, 
            score: 0,
        })

        const cards = conn.room.whiteDeck.splice(0, 10)

        conn.room.hands.push({
            nickname, 
            id, 
            cards,
        })

        conn.room.broadcast({
            event: 'join',
            data: {
                players: conn.room.players,
            }
        })

        conn.reply({
            event: 'deal',
            data: {
                room: conn.room.safe(),
                cards,
            }
        })

        conn.room.message(`<b>${nickname}</b> has joined the game.`)
    }

    conn.room.clients.push(conn)
}