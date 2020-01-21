import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './room.sass'

export default ({ ws, connected }) => {
    const router = useRouter()

    const [blackCard, setBlackCard] = useState({
        text: "What's that sound?",
        pick: 1
    })

    const [hand, setHand] = useState([])
    const [room, setRoom] = useState({ })

    useEffect(() => {
        if (connected) {
            ws.send({
                event: 'join',
                data: { 
                    room: { 
                        id: router.query.id 
                    } 
                }
            })

            ws.on('deal', ({ room, cards }) => {
                setHand(cards)
                setRoom(room)
            })
        }
    }, [connected])

    const renderHand = () => {
        return hand.map(
            (content, index) => <div 
                className={styles.card}
                dangerouslySetInnerHTML={{__html: content}}
            ></div>
        )
    }

    /* put a bar on the bottom of the mobile layout for navigation */

    return <>
        {/* <div className={styles.nav}></div> */}
        <div className={styles.room}>
            <div className={styles.hand}>{ renderHand() }</div>
            <div className={styles.game}>
                <h2 dangerouslySetInnerHTML={{__html: blackCard.text}}></h2>
            </div>
            <div className={styles.mobileHand}>{ renderHand() }</div>
            <div className={styles.chat}></div>
        </div>
    </>
}