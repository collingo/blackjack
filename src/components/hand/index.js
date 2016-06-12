import React from 'react'

export default ({ hand }) => {
  return <p>Hand: {hand.valueSeq().map((card) => {
    let { value, suit } = card.toJS()
    return <span key={`${value}${suit}`}>{value}{suit} </span>
  })}</p>
}
