# Blackjack

A basic exercise implementing Blackjack in React/Redux. Represents 3-4 hours work so there is plenty to improve on.

## Features

 - 1 player vs Dealer
 - Minimal set of Blackjack rules implemented
  - Players can stand
  - Players can hit
  - Scores tallied up
  - Aces can be high or low (11/1)
  - Dealer hits until score > 16
  - Player and dealer statuses calculated
  - Winner calculated
 - Cards randomly generated using lodash's sample function
 - Games can use 1+ decks

## Requirements

 - node/npm

## Usage

 1. `npm i`
 1. `./node_modules/.bin/webpack`
 1. `open ./public/index.html`

## Development

 - `./node_modules/.bin/webpack -w`

## Todo

 - [ ] Limit hands to 5 cards
 - [ ] Use proper Redux actions as opposed to hardcoding them
 - [ ] Allow multiple players
 - [ ] Allow player customisation - name, avatar etc
 - [ ] Add tests/refactor
 - [ ] Enhance the UI with graphics and styling
 - [ ] Add server so running from file system no required
 - [ ] Add further game mechanisms - score keeping, betting, splitting etc
 - [ ] Add standardjs linting
 - [ ] Move build/compilation tooling into Docker container
 - [ ] Wrap app in Docker for deployment
 - [ ] Setup CI/CD
