import { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ styles, nickname, setNickname }) => {
    const [roomIdInput, setRoomIdInput] = useState('')

    const clearNickname = () => {
        axios('/api/nickname/clear')
            .then(() => setNickname(null))
            .catch(console.error)
    } 

    return <>
        <div className={styles.vertical}>
            <input key={'room_id'} placeholder="enter room id.."/> 
            <p className={ styles.or }>OR</p>
            <button key={'host_room'} onClick={() => {}}>host room</button>
        </div>
        <div>
            <span>you are currently known as <i>{nickname}</i>.</span><a onClick={clearNickname}>change nickname</a>
        </div>
    </>
}