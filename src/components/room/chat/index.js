import React, { useState, useEffect } from 'react'

import styles from './chat.sass'
import Player from '../player'

export default ({ ws }) => {
    const [chat, setChat] = useState([])
    const [chatLoaded, setChatLoaded] = useState(false)
    const [hasScrolledChat, setHasScrolledChat] = useState(false)

    const sendMessage = ( content ) => {
        ws.send('message', { content })
    }

    const inputKeydownHandler = ({ key, target }) => {
        if (key === 'Enter') {
            sendMessage(target.value)
            target.value = ''
        }
    }

    const scrollChatToBottom = () => {
        const lastChild = document.querySelector(`.${styles.log} > p:last-child`)
        if (lastChild) lastChild.scrollIntoView()
    }

    useEffect(() => {
        if (ws.connected) ws.on('deal', ({ room }) => {
            setChat(room.chat)
            setChatLoaded(true)
        })
    }, [ws])

    useEffect(() => {
        if (!chatLoaded) return

        if (chat.length > 0) scrollChatToBottom()

        ws.on('message', ( message ) => {
            chat.push(message)
            setChat([...chat])

            if (!hasScrolledChat) scrollChatToBottom()
        })
    }, [chatLoaded])

    const Message = ({ children, ...restProps }) => (
        <div className={styles.message} {...restProps}>{children}</div>
    )

    const log = () => chat.map(({ 
        content, 
        player, 
        server,
    }, index) => {
        if (server) {
            return <Message key={index}>
                <span className={styles.serverMessage}>content</span>
            </Message>
        } else {
            return <Message key={index}>
                <Player>{player}</Player>
                <span>: {content}</span>
            </Message>
        }
    })

    const onScroll = ({ target }) => setHasScrolledChat(
        target.scrollTop + target.clientHeight < target.scrollHeight
    )

    return <div className={styles.chat}>
        <div className={styles.log} onScroll={onScroll}>
            { log }
        </div>
        
        <input onKeyDown={inputKeydownHandler} placeholder="enter message.." />
    </div>
}