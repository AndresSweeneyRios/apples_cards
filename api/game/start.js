module.exports = (conn) => {
    if (conn.cookies.id !== conn.room.owner.id) return

    conn.room.started = true
    conn.room.broadcast('room-update', { started: true })

    const blackCard = conn.room.blackCard = conn.room.blackDeck.splice(0, 1)[0]

    conn.room.broadcast('room-update', { blackCard })
}