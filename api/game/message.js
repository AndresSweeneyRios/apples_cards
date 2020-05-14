module.exports = (conn, { content }) => {
    if (!conn.verified || !conn.room) return

    const message = {
        content,

        player: conn.cookies
    }

    conn.room.chat.push(message)

    conn.room.broadcast('message', message)
}