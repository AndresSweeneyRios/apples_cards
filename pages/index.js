import { useState, useEffect } from 'react'
import axios from 'axios'
import { home } from './index.sass'

export default ({ ws, nickname, setNickname }) => {
    const [nicknameInput, setNicknameInput] = useState('')

    const submitNickname = (string) => {
        axios(`/api/nickname/set/${string}`).then(
            () => setNickname(nicknameInput)
        ).catch(console.error)
    }

    useEffect(() => {
        setNicknameInput(nickname || '')
    }, [nickname])

    return (
        <div className={ home }>
            <h1>Apple's Cards</h1>

            <div>
                <input onChange={
                    ({ target }) => setNicknameInput(target.value)
                } value={nicknameInput} />

                <button onClick={() => submitNickname(nicknameInput)}>set nickname</button>
            </div>
        </div>
    )
}