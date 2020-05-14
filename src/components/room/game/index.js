import React from 'react'

import Card from '../card'
import styles from './game.sass'

const Game = ({ ws, room, picks, setPicks, id }) => {
    const startGame = () => ws.send('start')

    const Pick = ({ pick, index }) => {
        const onMouseDown = () => {
            picks[index] = {}
            setPicks([...picks])
        }

        return <div className={styles.slot}>{ 
            pick.content ? <Card content={pick.content} onMouseDown={onMouseDown}/> : <></>
        }</div>
    }

    const isHost = room.owner && room.owner.id === id

    const GetReady = () => {
        if (isHost) return <button onClick={startGame}>start game</button>
        else return <h2>Waiting for host..</h2>
    }

    const Board = () => <>
        <h2 dangerouslySetInnerHTML={{__html: room.blackCard.text}}></h2>

        <div className={ styles.picks }>{
            picks.map((pick, index) => <Pick pick={pick} key={index} index={index}/>)
        }</div>
    </>

    return <div className={styles.game}>
        { room.started ? <Board /> : <GetReady /> }
    </div>
}

export default Game
