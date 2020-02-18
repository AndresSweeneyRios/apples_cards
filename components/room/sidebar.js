import styles from '../../pages/room/room.sass'
import { useState, useEffect, createRef } from 'react'

export default ({ ws, room }) => {
    const [chat, setChat] = useState([])
    const [chatLoaded, setChatLoaded] = useState(false)

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
        document
            .querySelector(`.${styles.log} > p:last-child`)
            .scrollIntoView()
    }

    useEffect(() => {
        if (ws.connected) ws.on('deal', ({ room }) => {
            setChat(room.chat)
            setChatLoaded(true)
        })
    }, [ws])

    useEffect(() => {
        if (chatLoaded) {
            if (chat.length > 0) scrollChatToBottom()

            let hasScrolledChat = false

            document
                .querySelector(`.${styles.log}`)
                .addEventListener('scroll', ({ target }) => {
                    hasScrolledChat = target.scrollTop + target.clientHeight < target.scrollHeight
                })

            ws.on('message', ( message ) => {
                chat.push(message)
                setChat([...chat])

                if (!hasScrolledChat) scrollChatToBottom()
            })
        }
    }, [chatLoaded])

    return <div className={styles.chat}>
        <div className={styles.scoreboard}>
            <h4>scoreboard</h4>
            <hr />
            {
                room.players.map(
                    ({ nickname, score }, index) => <h5 key={index}>
                        <span className={styles.label}>{nickname}:</span>
                        {score}
                    </h5>
                )
            }
            {/* { room.czar !== undefined ? <h4><span className={styles.label}>czar:</span> {room.players[room.czar].nickname}</h4> : ''} */}
        </div>

        <div className={styles.shadow} />

        <div className={styles.log}>
            {chat.map(({ content, player, server }, index) => server 
                ? <p 
                    className={styles.serverMessage} 
                    dangerouslySetInnerHTML={{__html: content}}
                    key={index}
                ></p> 
                
                : <p className={styles.message} key={index}>
                    <b>{player.nickname}:</b> { content } 
                </p>
            )}
        </div>
        
        <div className={ styles.send }>
            <input onKeyDown={inputKeydownHandler} placeholder="enter message.." />
            {/* <button onClick={ sendMessage }>send</button> */}
        </div>
    </div>
}