import React from "react";

const CardPreEditDescription = ({ description, handleEditDescriptionClick }) => {
  return (
    <form className="description">
      <p>Description</p>
      <span id="description-edit" className="link" onClick={handleEditDescriptionClick}>
        Edit
      </span>
      <p className="textarea-overlay">
      {description}
      </p>
      <p id="description-edit-options" className="hidden">
        You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
}

export default CardPreEditDescription;