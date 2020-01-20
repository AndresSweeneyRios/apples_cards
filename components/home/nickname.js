import { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ nickname, setNickname }) => {
    const [nicknameInput, setNicknameInput] = useState('')

    const submitNickname = (string) => {
        axios(`/api/nickname/set/${string}`).then(
            () => setNickname(nicknameInput)
        ).catch(console.error)
    }

    useEffect(() => {
        setNicknameInput(nickname || '')
    }, [nickname])

    return <>
        <div>
            <input 
                onChange={ ({ target }) => setNicknameInput(target.value) } 
                value={nicknameInput} 
                placeholder="nickname.."
            />

            <button onClick={() => submitNickname(nicknameInput)}>set nickname</button>
        </div>
        <div>
            <span>a nickname is required to play.</span>
        </div>
    </>
}