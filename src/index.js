import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import reducer from './reducers'

const defaultState = {
  game: null
}

const store = createStore(reducer, defaultState, window.devToolsExtension && window.devToolsExtension())

render(<Provider store={store}><App /></Provider>, document.getElementById('stage'))
