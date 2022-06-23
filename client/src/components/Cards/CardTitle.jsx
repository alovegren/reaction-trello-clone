import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateCard } from "../../features/cards/cards"

const CardTitle = ({ cardTitle, cardId }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState(cardTitle);

  const handleCardTitleChange = () => {
    dispatch(updateCard({cardInfo: { card: { title } }, cardId }));
  }

  return (
    <>
      <textarea
        className="list-title"
        style={{ height: "45px" }}
        onBlur={handleCardTitleChange}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </>
  )
}

export default CardTitle;