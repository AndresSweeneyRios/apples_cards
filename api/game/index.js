const events = [
    ['join', require('./join')],
    ['message', require('./message')],
]

module.exports = ({ rooms, on }) => {
    events.forEach(
        ([name, callback]) => on(name, (conn, data) => {
            try {
                callback(conn, data, { rooms })
            } catch (error) {
                console.error(error)
            }
        })
    )
}