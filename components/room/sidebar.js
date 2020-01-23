import styles from '../../pages/room/room.sass'

export default ({ room }) => {
    const sendMessage = () => {}

    return <div className={styles.chat}>
        <div className={styles.scoreboard}>
            <h3>scoreboard</h3>
            {
                room.players.map(
                    ({ nickname, score }, index) => <h4 key={index}>
                        <span className={styles.label}>{nickname}:</span>
                        {score}
                    </h4>
                )
            }
            <br />
            { room.czar !== undefined ? <h3><span className={styles.label}>czar:</span> {room.players[room.czar].nickname}</h3> : ''}
        </div>

        <div className={styles.log}>
            {room.chat.map( ({ message, server }) => {
                <p className={`${styles.message} ${ server ? styles.serverMessage : ''}`}>{ message }</p>
            })}
        </div>
        
        <div className={ styles.send }>
            <input placeholder="enter message.." />
            {/* <button onClick={ sendMessage }>send</button> */}
        </div>
    </div>
}