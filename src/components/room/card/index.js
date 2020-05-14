import React from 'react'

import styles from './card.sass'

const Card = ({ content, ...restProps }) => <div 
    className={styles.card}
    dangerouslySetInnerHTML={{ __html: content }}
    { ...restProps }
/>

export default Card