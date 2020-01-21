module.exports = (conn, { content }) => {
    if (!conn.verified || !conn.room) return

    this.broadcast('message', {
        content: content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
    })
}