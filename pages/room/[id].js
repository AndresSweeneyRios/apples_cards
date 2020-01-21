import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './room.sass'

export default ({ ws, connected, id }) => {
    const router = useRouter()

    const [hand, setHand] = useState([])
    const [picks, setPicks] = useState([])
    
    const [room, setRoom] = useState({
        players: [],
        blackCard: {
            text: '',
            picks: 0,
        }
    })

    const isHost = room.owner && room.owner.id === id

    useEffect(() => {
        if (connected) {
            const { id } = router.query
            
            ws.send('join', { room: {id} })

            ws.on('deal', ({ room, cards }) => {
                setHand(cards)
                setRoom(room)
            })

            ws.on('room-update', (data) => {
                Object.assign(room, data)
                setRoom(room)
                if (data.blackCard) setPicks(
                    new Array(data.blackCard.picks).fill({})
                )
            })
        }
    }, [connected])

    const Card = (content, index, { slotProps, ...restProps } = {}) => <div 
        className={styles.card}
        dangerouslySetInnerHTML={{__html: content}}
        index={index}
        key={index}
        { ...restProps }
    ></div>

    const renderHand = () => {
        return hand.map(
            (content, index) => <div className={styles.slot} key={index}> { 
                Card(content, index, {
                    style: picks.filter(pick => index === pick.index).length ? {
                        opacity: 0,
                        pointerEvents: 'none',
                    }: {},

                    onMouseDown () {
                        Object.assign(
                            picks.find(pick => !pick.content) || {},
                            { content, index }
                        )

                        setPicks([...picks])
                    },
                })
            } </div>
        )
    }

    const startGame = () => ws.send('start')

    /* put a bar on the bottom of the mobile layout for navigation */

    return <>
        <div className={styles.room}>
            <div className={styles.hand}>{ renderHand() }</div>
            <div className={styles.game}>
                {
                    room.started 
                    ? <h2 dangerouslySetInnerHTML={{__html: room.blackCard.text}}></h2>
                    : isHost 
                        ? <button onClick={startGame}>start game</button>
                        : <h2>Waiting for host..</h2>
                }
                
                <div className={ styles.picks }>
                    {picks.map( (pick, index) => <div className={styles.slot} key={index}>
                        { pick.content ? Card(pick.content, pick.index, {
                            onMouseDown () {
                                picks[index] = {}
                                setPicks([...picks])
                            },
                        }) : '' }
                    </div>)}
                </div>
            </div>
            <div className={styles.mobileHand}>
                { renderHand() }
                <div className={styles.end}></div>
            </div>
            <div className={styles.chat}>
                <h3>scoreboard</h3>
                {
                    room.players.map(
                        ({ nickname, score }) => <h4>
                            <span className={styles.label}>{nickname}:</span>
                            {score}
                        </h4>
                    )
                }
            </div>
            {/* <div className={styles.nav}></div> */}
        </div>
    </>
}