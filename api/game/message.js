module.exports = (conn, { content }) => {
    if (!conn.verified || !conn.room) return

    const message = {
        content: content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;"),

        player: conn.cookies
    }

    conn.room.chat.push(message)

    conn.room.broadcast('message', message)
}