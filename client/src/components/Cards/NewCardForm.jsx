import React from "react"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from '../../features/cards/cards'

const NewCardForm = ({ listId, active, setActiveListId}) => {
  const dispatch = useDispatch()
  const [cardTitle, setCardTitle] = useState('');
  const addDropDownClass = active ? 'add-dropdown add-bottom active-card' : 'add-dropdown add-bottom'

  const handleNewCardButton = () => {
    setActiveListId(listId)
  }

  const resetCardForm = () => {
    setCardTitle('');
    setActiveListId('')
  }

  const handleNewCard = () => {
    dispatch(createCard({
      newCardInput: { cardTitle, listId },
      callback: resetCardForm,
    }));
  }

  return (
  <>
    <div className={addDropDownClass}>
      <div className="card">
        <div className="card-info"></div>
        <textarea onChange={(event) => setCardTitle(event.target.value)} value={cardTitle} name="add-card"></textarea>
        <div className="members"></div>
      </div>
      <a onClick={handleNewCard} className="button">Add</a>
      <i onClick={resetCardForm} className="x-icon icon"></i>
      <div className="add-options">
        <span>...</span>
      </div>
    </div>
    <div onClick={handleNewCardButton} className="add-card-toggle" data-position="bottom">
      Add a card...
    </div>
    </>
  )
}

export default NewCardForm;