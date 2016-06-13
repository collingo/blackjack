import Immutable from 'immutable'
import Guid from 'guid'
import { sample, mapValues } from 'lodash'

const SUITS = ['H', 'D', 'S', 'C']
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
const SCORES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10,  10,  10,  11]
const STATUSES = {
  ok: 'OK',
  bust: 'BUST',
  fold: 'FOLD'
}

function sameCard (card1, card2) {
  return card1.get('suit') === card2.get('suit') && card1.get('value') === card2.get('value')
}

function countMatches (subject, collection) {
  return collection.reduce((count, item) => {
    return sameCard(subject, item) ? ++count : count
  }, 0)
}

function draw (number, decks, drawn = Immutable.List()) {
  let cards = Immutable.List()
  for (let i = 0; i < number; i++) {
    let card
    while (!card || countMatches(card, drawn.concat(cards)) > decks - 1) {
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
  let drawn, dealerHand, dealer
  [ dealerHand, drawn ] = draw(1, decks, drawn)
  dealer = Immutable.Map({
    name: 'Dealer',
    hand: dealerHand,
    score: tally(dealerHand.toJS()),
    status: 'OK'
  })
  players = Immutable.Map(mapValues(players, (player) => {
    let hand
    [ hand, drawn ] = draw(2, decks, drawn)
    return Immutable.Map(Object.assign({}, player, {
      hand: hand,
      bet: 0,
      score: tally(hand.toJS()),
      status: 'OK'
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
  let cards
  let decks = game.get('decks')
  let drawn = game.get('drawn')
  let hand = game.getIn(['dealer', 'hand'])
  let score = tally(hand.toJS())
  while (score < 17) {
    [cards, drawn] = draw(1, decks, drawn)
    hand = hand.push(cards.get(0))
    score = tally(hand.toJS())
  }
  let status = getStatus(score)
  return game
    .setIn(['players', playerId, 'status'], 'standing')
    .setIn(['dealer', 'hand'], hand)
    .setIn(['dealer', 'score'], score)
    .setIn(['dealer', 'status'], status)
    .set('winner', getWinner(score, game.getIn(['players', playerId, 'score'])))
    .set('drawn', drawn)
}

function countAces (cards) {
  return cards.reduce((count, item) => {
    return item.value === 'A' ? ++count : count
  }, 0)
}

function tally (hand) {
  let score = hand.reduce((score, card) => score + SCORES[VALUES.indexOf(card.value)], 0)
  let aceCount = 0
  while (score > 21 && aceCount < countAces(hand)) {
    score = score - 10
    aceCount++
  }
  return score
}

function getStatus (score) {
  let status = 'OK'
  switch (true) {
    case score > 21:
      status = 'Bust'
      break;
  }
  return status
}

function getWinner (dealer, player) {
  let winner = null
  switch (true) {
    case player > 21:
      winner = 'Dealer'
      break
    case dealer > 21:
      winner = 'Player'
      break
    case dealer <= 21 && player <= 21:
      winner = player > dealer ? 'Player' : 'Dealer'
  }
  return winner
}

function hit (game, playerId) {
  let [cards, drawn] = draw(1, game.get('decks'), game.get('drawn'))
  let hand = game.getIn(['players', playerId, 'hand']).push(cards.get(0))
  let score = tally(hand.toJS())
  let status = getStatus(score)
  return game
    .setIn(['players', playerId, 'hand'], hand)
    .setIn(['players', playerId, 'score'], score)
    .setIn(['players', playerId, 'status'], status)
    .set('winner', status === 'Bust' ? 'Dealer' : null)
    .set('drawn', drawn)
}

export default {
  new: newGame,
  stand: stand,
  hit: hit
}
