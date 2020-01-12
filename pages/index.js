import { useState, useEffect } from 'react'
import axios from 'axios'
import { home } from './index.sass'

export default () => {
    const [text, setText] = useState("loading...")

    useEffect(() => {
        axios('/api/helloworld').then(
            ({ data }) => setText(data)
        ).catch( console.error )
    }, [])

    return (
        <div className={ home }>{ text }</div>
    )
}