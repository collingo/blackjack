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

export default connect(mapStateToProps, mapDispatchToProps)(({ player, stand, hit }) => <div>
  <h2>{player.get('name')}</h2>
  <p>Bet: {player.get('bet')}</p>
  <Hand hand={player.get('hand')} />
  <button onClick={stand}>Stand</button>
  <button onClick={hit}>Hit</button>
</div>)
