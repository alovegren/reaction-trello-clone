import React from "react"
import Card from "./Card"
import { useSelector } from "react-redux"

const Cards = ({ listId }) => {
  const currentCards = useSelector(state => state.cards)
                      .filter(card =>card.listId === listId)

  return (
    <div id="cards-container" data-id="list-1-cards">
    { currentCards.map(card => <Card key={card._id} cardDetails={card} />) }
    </div>
  )
}

export default Cards;