import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './room.sass'
import Hand from '../../components/room/hand'
import Game from '../../components/room/game'
import Sidebar from '../../components/room/sidebar'

export default ({ ws, id }) => {
    const router = useRouter()

    const [hand, setHand] = useState([])
    const [picks, setPicks] = useState([])
    
    const [room, setRoom] = useState({
        players: [],
        chat: [],
        blackCard: {
            text: '',
            picks: 0,
        }
    })

    useEffect(() => {
        if (ws.connected) {
            const { id } = router.query

            const localRoom = room

            ws.send('join', { room: {id} })

            ws.on('deal', ({ room, cards }) => {
                setHand(cards)
                Object.assign(localRoom, room)
                setRoom(room)
                if (room.blackCard) setPicks(
                    new Array(room.blackCard.picks).fill({})
                )
            })

            ws.on('room-update', (data) => {
                Object.assign(localRoom, data)
                console.log(data)
                setRoom(localRoom)
                if (data.blackCard) setPicks(
                    new Array(data.blackCard.picks).fill({})
                )
            })
        }
    }, [ws])


    /* put a bar on the bottom of the mobile layout for navigation */

    const renderHand = () => Hand({ hand, picks, setPicks })

    return <>
        <div className={styles.room}>
            <div className={styles.hand}>{ renderHand() }</div>
            <Game {...{ ws, room, picks, setPicks, id }} />
            <div className={styles.mobileHand}>
                { renderHand() }
                <div className={styles.end}></div>
            </div>
            <Sidebar {...{ room }} />
            {/* <div className={styles.nav}></div> */}
        </div>
    </>
}