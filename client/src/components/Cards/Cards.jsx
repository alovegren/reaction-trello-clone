import React from "react";

import Card from "./Card";

import { useSelector } from "react-redux";
import NewCardForm from './NewCardForm';

import { Link, useParams } from "react-router-dom";

const Cards = ({ listId, active, setActiveListId }) => {
  const { board_id } = useParams()

  const currentCards = useSelector(state => state.cards)
                      .filter(card =>card.listId === listId)

  return (
  <>
    <div id="cards-container" data-id="list-1-cards">
      {currentCards.map(card => (
        <>
          <Link to={`/boards/${board_id}/${card._id}`}>
            <Card key={card._id} cardDetails={card} />
          </Link>
        </>
      ))}
    </div>
    <NewCardForm listId={listId} active={active} setActiveListId={setActiveListId}/>
  </>
  )
}

export default Cards;