import { useState, useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'

export default ({ ws, styles, nickname, setNickname }) => {
    const [roomIdInput, setRoomIdInput] = useState('')

    const clearNickname = () => {
        axios('/api/nickname/clear')
            .then(() => setNickname(null))
            .catch(console.error)
    } 

    const handleRoomIdChange = ({ target }) => {
        setRoomIdInput(target.value)
    }

    const joinRoom = (id) => {
        axios(`/api/rooms/exists/${id}`).then(({ data: exists }) => {
            if (exists) {
                Router.push(`/room/${id}`)
            } else {
                
            }
        }).catch(console.error)
    }

    const hostRoom = () => {
        axios(`/api/rooms/create`).then(({ data: room }) => {
            Router.push(`/room/${room.id}`)
        }).catch(console.error)
    }

    return <>
        <div className={styles.vertical}>
            <input 
                key={'room_id'} 
                placeholder="enter room id.."
                onChange={handleRoomIdChange}
                value={roomIdInput}
            /> 

            <p className={ styles.or }>OR</p>
            <button key={'host_room'} onClick={hostRoom}>host room</button>
        </div>
        <div>
            <span>you are currently known as <i>{nickname}</i>.</span><a onClick={clearNickname}>change nickname</a>
        </div>
    </>
}