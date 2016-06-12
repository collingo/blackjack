import Immutable from 'immutable'
import Guid from 'guid'
import { sample, some, mapValues } from 'lodash'

const SUITS = ['H', 'D', 'S', 'C']
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']

function existsIn (subject, collection) {
  return some(collection, (item) => item.suit === subject.suit && item.value === subject.value)
}

function sameCard (card1, card2) {
  return card1.get('suit') === card2.get('suit') && card1.get('value') === card2.get('value')
}

function count (subject, collection) {
  return collection.reduce((matches, item) => {
    if (sameCard(subject, item)) {
      matches.push(item)
    }
    return matches
  }, []).length
}

function draw (number, decks, drawn = Immutable.List()) {
  let cards = Immutable.List()
  for (let i = 0; i < number; i++) {
    let card
    while (!card || count(card, drawn.concat(cards)) > decks - 1) {
      card = Immutable.Map({
        suit: sample(SUITS),
        value: sample(VALUES)
      })
    }
    cards = cards.push(card)
  }
  return [cards, drawn.concat(cards)]
}

function newGame (decks = 1, players = [], minimum = 50) {
  let drawn, dealer
  [ dealer, drawn ] = draw(1, decks, drawn)
  players = Immutable.Map(mapValues(players, (player) => {
    let hand
    [ hand, drawn ] = draw(2, decks, drawn)
    return Immutable.Map(Object.assign({}, player, {
      hand: hand,
      bet: 0,
      status: null
    }))
  }))
  return Immutable.Map({
    id: Guid.create().value,
    decks,
    minimum,
    drawn,
    dealer,
    players
  })
}

function stand (game, playerId) {
  return game.setIn(['players', playerId, 'status'], 'standing')
}

function hit (game, playerId) {
  let [cards, drawn] = draw(1, game.get('decks'), game.get('drawn'))
  return game
    .setIn(['players', playerId, 'hand'], game.getIn(['players', playerId, 'hand']).push(cards.get(0)))
    .set('drawn', drawn)
}

export default {
  new: newGame,
  stand: stand,
  hit: hit
}
