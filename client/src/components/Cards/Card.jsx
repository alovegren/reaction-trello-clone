import React from "react"
import CardLabel from "../Labels/CardLabel";

const Card = ({ cardDetails }) => {
  return (
    <div className="card-background">
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {cardDetails.labels.map(label => <CardLabel key={label} color={label} />)}
          <p>{cardDetails.title}</p>
        </div>
        <div className="card-icons">
          <i className="clock-icon sm-icon overdue-recent completed">
            {cardDetails.dueDate}
          </i>
          <i className="description-icon sm-icon"></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
    </div>
  )
}

export default Card;