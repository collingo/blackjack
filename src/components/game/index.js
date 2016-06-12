import React from 'react'
import Player from '../player'
import Hand from '../hand'

export default ({ game }) => {
  return <div id="game">
    <h1>Game: {game.id}</h1>
    <div>
      <h2>Dealer</h2>
      <Hand hand={game.get('dealer')} />
    </div>
    {game.get('players').valueSeq().map((player) => <Player key={player.get('id')} player={player} />)}
  </div>
}
