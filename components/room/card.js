import styles from '../../pages/room/room.sass'

export default  (content, index, { slotProps, ...restProps } = {}) => <div 
    className={styles.card}
    dangerouslySetInnerHTML={{__html: content}}
    index={index}
    key={index}
    { ...restProps }
></div>