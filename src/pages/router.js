import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import WSConnector from '../scripts/ws-connector.js'

import Home from './home'
import Room from './room'

import '@/sass/global.sass'

export default () => {
    const [ws, setWs] = useState({ open: false, connected: false })
    const [nickname, setNickname] = useState(null)
    const [id, setId] = useState(null)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        if (process.browser) {
            WSConnector({ ws, setWs })
        }
    }, [])

    useEffect(() => {
        axios('/api/nickname/get').then(
            ({ data }) => {
                setNickname(data.nickname)
                setId(data.id)
            }
        ).catch(() => setNickname(false))
    }, [])

    useEffect(() => {
        if (ws.open && nickname && !ws.connected) {
            ws.on('error', console.error)

            axios('/api/rooms/connect').then(
                ({ data: { token } }) => {
                    ws.send('connect', { token })
                    ws.on('connected', () => {
                        setWs({ ...ws, connected: true })
                    })
                }
            ).catch(console.error)
        }
    }, [ws, nickname])

    const props = {
        ws,
        nickname,
        setNickname,
        connected,
        id,
    }

    return <Router>
        <Switch>
            <Route path="/" exact={true}>
                <Home {...props}/>
            </Route>
            <Route path="/room/:id">
                <Room {...props}/>
            </Route>
        </Switch>
    </Router>
}