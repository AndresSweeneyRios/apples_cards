export default ({ setWs }) => {
    const events = []
    const client = new WebSocket( `ws://${window.location.hostname}:${process.env.WS_PORT}`)

    const send = (event, data) => {
        client.send(JSON.stringify({ event, data }))
    }

    const on = (name, callback) => { 
        events.push({
            name,
            callback,
            index: events.length
        })
    }

    const clearEvent = (index) => events[index] = null

    client.onopen = () => {
        setWs({
            open: true,
            connected: false,
            send,
            on,
        })
    }
    
    client.onmessage = ({ data: string }) => {
        let json

        try {
            json = JSON.parse(string)
        } catch {
            return console.error('Invalid JSON from server')
        }

        const { event, data } = json

        console.log(event)

        for ( const { name, callback, index } of events.filter(Boolean) ) {
            if (event.includes(name)) {
                const { clear } = callback(data) || {}
                if (clear) clearEvent(index)
            }
        }
    }
}