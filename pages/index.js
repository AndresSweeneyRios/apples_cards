import { useState, useEffect } from 'react'

export default () => {
    const [text, setText] = useState("loading")

    useEffect(async () => {
        const helloworld = await fetch('/api/helloworld')
        setText(await helloworld.text())
    }, [])

    return (
        <div>{ text }</div>
    )
}