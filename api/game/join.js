module.exports = (conn, { room }, { rooms }) => {
    if (!conn.verified) return

    conn.room = rooms[room.id]

    const { nickname, id } = conn.cookies
    
    conn.room.players.push({ 
        nickname, 
        id, 
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

    conn.room.clients.push(conn)

    conn.reply({
        event: 'deal',
        data: {
            room: conn.room.safe(),
            cards,
        }
    })

    conn.room.message(`<b>${nickname}</b> has joined the game.`)
}