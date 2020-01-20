const events = [
    ['join', require('./join')],
    ['message', require('./message')],
]

module.exports = ({ rooms, on }) => {
    events.forEach(
        ([name, callback]) => on(name, (conn, data) => callback(conn, data, { rooms }))
    )
}