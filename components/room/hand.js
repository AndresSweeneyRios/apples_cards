import Card from './card'
import styles from '../../pages/room/room.sass'
import { useEffect, useState } from 'react'

export default ({ picks, setPicks, hand }) => {
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