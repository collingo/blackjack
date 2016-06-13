import React from 'react'
import Player from '../player'
import Hand from '../hand'

export default ({ game }) => {
  return <div id="game">
    <h1>Game: {game.get('id')}</h1>
    <div>
      <h2>Dealer</h2>
      <Hand hand={game.getIn(['dealer', 'hand'])} />
      <p>Score: {game.getIn(['dealer', 'score'])}</p>
      <p>Status: {game.getIn(['dealer', 'status'])}</p>
    </div>
    {game.get('players').valueSeq().map((player) => <Player key={player.get('id')} player={player} />)}
    {game.get('winner') && <p>Winner: {game.get('winner')}</p>}
  </div>
}
