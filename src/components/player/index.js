import React from 'react'
import { connect } from 'react-redux'
import Hand from '../hand'

function mapStateToProps (state, ownProps) {
  return {}
}
function mapDispatchToProps (dispatch, ownProps) {
  return {
    stand: () => dispatch({ type: 'stand', playerId: ownProps.player.get('id') }),
    hit: () => dispatch({ type: 'hit', playerId: ownProps.player.get('id') })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(({ player, stand, hit }) => {
  let buttons = player.get('status') === 'OK' && [
    <button key='stand' onClick={stand}>Stand</button>,
    <button key='hit' onClick={hit}>Hit</button>
  ]
  return <div>
    <h2>{player.get('name')}</h2>
    <Hand hand={player.get('hand')} />
    <p>Score: {player.get('score')}</p>
    <p>Status: {player.get('status')}</p>
    {buttons}
  </div>
})
