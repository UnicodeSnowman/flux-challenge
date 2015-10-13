import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from './handlers/root'
import { setCurrentPlanet } from './action_creators'
import store from './store'

require('./styles.css')

const socket = new WebSocket('ws://localhost:4000')
socket.onmessage = function(event) {
    const data = JSON.parse(event.data)
    store.dispatch(setCurrentPlanet(data))
}

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
)
