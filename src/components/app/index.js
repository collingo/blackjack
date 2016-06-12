import React from 'react'
import { connect } from 'react-redux'
import Game from '../game'

function mapStateToProps (state) {
  return {
    game: state.game
  }
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    newGame: () => dispatch({ type: 'newGame' })
  }
}
const App = connect(mapStateToProps, mapDispatchToProps)(({ game, newGame }) => {
  let gameHtml
  if (game) {
    gameHtml = <Game game={game}/>
  }
  return <div id="app">
    {gameHtml || <button onClick={newGame}>New game</button>}
  </div>
})

export default App
