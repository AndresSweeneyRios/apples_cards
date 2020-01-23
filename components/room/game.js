import Card from './card'
import styles from '../../pages/room/room.sass'

export default ({ ws, room, picks, setPicks, id }) => {
    const startGame = () => ws.send('start')

    const isHost = room.owner && room.owner.id === id

    return <div className={styles.game}>
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
}