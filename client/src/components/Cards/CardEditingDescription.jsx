import React, { useState } from "react";
import { updateCard } from "../../features/cards/cards";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

const CardEditingDescription = ({ originalDes, handleExitEditDescriptionClick }) => {
  const {card_id: cardId} = useParams()
  const [description, setDescription] = useState(originalDes)
  const dispatch = useDispatch();

  const handleSaveDescription = () => {
    dispatch(updateCard({cardInfo: { card: {description} }, cardId}))
    handleExitEditDescriptionClick();
  }

  return (
    <form className="description">
      <p>Description</p>
      <textarea className="textarea-toggle" rows="1" autoFocus 
                onChange={(e) => setDescription(e.target.value)}>
        {description}
      </textarea>
      <div>
        <div className="button" value="Save" onClick={handleSaveDescription}>
          Save
        </div>
        <i className="x-icon icon" onClick={handleExitEditDescriptionClick}></i>
      </div>
    </form>
  )
}

export default CardEditingDescription;