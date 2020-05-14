import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Room = ({ ws, styles, nickname, setNickname, history }) => {
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
                history.push(`/room/${id}`)
            } else {
                
            }
        }).catch(console.error)
    }

    const hostRoom = () => {
        axios(`/api/rooms/create`).then(({ data: room }) => {
            history.push(`/room/${room.id}`)
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

export default withRouter(Room)
