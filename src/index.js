import { createStore, combineReducers } from 'redux'
import { connect, Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'

const defaultState = {
  count: 0,
  actions: {
    inc: 0,
    dec: 0
  }
}

function counterReducer (state = defaultState.count, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}
function actionsReducer (state = defaultState.actions, action) {
  switch (action.type) {
    case 'increment':
      return Object.assign({}, state, {
        inc: state.inc + 1
      })
    case 'decrement':
      return Object.assign({}, state, {
        dec: state.dec + 1
      })
    default:
      return state
  }
}

const storeReducer = combineReducers({
  count: counterReducer,
  actions: actionsReducer
})

const store = createStore(storeReducer, defaultState, window.devToolsExtension && window.devToolsExtension())

function counterStP (state) {
  return {
    count: state.count,
    actions: state.actions
  }
}
function counterDtP (dispatch, ownProps) {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' })
  }
}
const Counter = connect(counterStP, counterDtP)(({ count, actions, increment, decrement }) => (
  <div>
    <div>{count}</div>
    <p><button onClick={increment}>Increment</button> {actions.inc}</p>
    <p><button onClick={decrement}>Decrement</button> {actions.dec}</p>
  </div>
))

render(<Provider store={store}><Counter /></Provider>, document.getElementById('stage'))
