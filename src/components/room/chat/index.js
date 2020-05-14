import React, { useState, useEffect } from 'react'

import styles from './chat.sass'

const Chat = ({ ws, room }) => {
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
        if (chat.length > 0 && !hasScrolledChat) {
            const lastChild = document.querySelector(`.${styles.log} > *:last-child`)
            lastChild.scrollIntoView()
        }
    }

    const onScroll = ({ target }) =>{ 
        setHasScrolledChat(
            target.scrollTop + target.clientHeight < target.scrollHeight
        )

        console.log(target.scrollTop + target.clientHeight < target.scrollHeight)
    }

    useEffect(scrollChatToBottom, [chat])

    useEffect(() => {
        if (ws.connected) ws.on('deal', ({ room }) => {
            setChat(room.chat)
            setChatLoaded(true)
        })
    }, [ws])

    useEffect(() => {
        if (!chatLoaded) return

        scrollChatToBottom()

        ws.on('message', ( message ) => {
            chat.push(message)
            setChat([...chat])
        })
    }, [chatLoaded])

    const log = chat.map(({ 
        content, 
        player, 
        server,
    }, index) => (
        server 
            ? <div key={index} className={styles.serverMessage}>{content}</div>
            : <div key={index}>{player.nickname}: {content}</div>
    ))
    
    const players = room.players.map(
        ({ nickname, score }, index) => {
            const isCzar = index === room.czar

            const Czar = () => <span className={styles.czar}>czar</span>

            const Score = () => <span className={styles.score}>: {score}</span>

            return <div key={index} className={styles.player}>
                {nickname}
                <Score />
                { isCzar ? <Czar /> : '' }
            </div>
        }
    )

    return <div className={styles.chat}>
        <div className={styles.log} onScroll={onScroll}>
            { log }
        </div>
        
        <div className={styles.sidebar}>
            <div className={styles.players}>
                <h4>players</h4>
                { players }
            </div>
        </div>
        
        <input onKeyDown={inputKeydownHandler} placeholder="enter message.." />
    </div>
}

export default Chat