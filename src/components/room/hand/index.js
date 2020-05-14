import React from 'react'

import Card from '../card'
import styles from './hand.sass'

const Hand = ({ picks, setPicks, hand }) => {
    const Slot = ({ content, index }) => {
        const onMouseDown = () => {
            Object.assign(
                picks.find(pick => !pick.content) || {},
                { content, index }
            )

            setPicks([...picks])
        }

        return <div className={styles.slot} key={index}>
            <Card 
                content={content} 
                invisible={String(picks.filter(pick => index === pick.index).length > 0)}
                onMouseDown={onMouseDown}
            />
        </div>
    }

    const slots = hand.map(
        (content, index) => <Slot content={content} key={index} index={index}/>
    )

    return <div className={styles.hand}>{ slots }</div>
}

export default Hand
