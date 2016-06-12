import Guid from 'guid'
import Game from '../lib/game'

export default function (state = null, action) {
  switch (action.type) {
    case 'newGame':
      let playerId = Guid.create().value
      return Game.new(1, {
        [playerId]: {
          id: playerId,
          name: 'Player 1'
        }
      })
    case 'stand':
      return Game.stand(state, action.playerId)
    case 'hit':
      return Game.hit(state, action.playerId)
    default:
      return state
  }
}
