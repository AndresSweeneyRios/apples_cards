import React from 'react'

import styles from './sidebar.sass'
import Player from '../player'

export default ({ room }) => {
    const players = room.players.map(
        ({ nickname, score }, index) => <Player key={index} >
            {nickname}
            <span className={styles.score}>{score}</span>
        </Player>
    )

    return <div className={styles.sidebar}>
        <div className={styles.czar}>
            <h4>czar</h4>
            <Player>{room.czar && room.players[room.czar].nickname}</Player>
        </div>

        <div className={styles.players}>
            { players }
        </div>
    </div>
}