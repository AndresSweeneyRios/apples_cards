import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './room.sass'

export default ({ ws, connected }) => {
    const router = useRouter()

    const [blackCard, setBlackCard] = useState({
        text: "What's that sound?",
        pick: 2
    })

    const [hand, setHand] = useState([])
    const [room, setRoom] = useState({ })
    const [picks, setPicks] = useState([{}, {}])

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
                        display: 'none',
                        pointerEvents: 'none',
                    }: {},

                    onMouseDown () {
                        Object.assign(
                            picks.find(pick => !pick.content) || {},
                            {
                                content,
                                index, 
                            }
                        )

                        setPicks([...picks])
                    },
                })
            } </div>
        )
    }

    /* put a bar on the bottom of the mobile layout for navigation */

    return <>
        {/* <div className={styles.nav}></div> */}
        <div className={styles.room}>
            <div className={styles.hand}>{ renderHand() }</div>
            <div className={styles.game}>
                <h2 dangerouslySetInnerHTML={{__html: blackCard.text}}></h2>
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
            <div className={styles.mobileHand}>{ renderHand() }<div className={styles.end}></div></div>
            <div className={styles.chat}></div>
        </div>
    </>
}