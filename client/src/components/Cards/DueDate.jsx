import React from "react";

import Popover from "../shared/Popover";
import DueDateForm from "./DueDateForm";

const DueDate = ({ dueDate, handleClosePopoverClick, state }) => {
  let displayDate;

  if (!dueDate) {
    displayDate = "No Due Date";
  } else {
    const date = new Date(dueDate)
    const today = new Date()
    const monthDay = date.toLocaleString('en-US', { month: 'short', day: 'numeric'})
    const time = date.toLocaleString('en-US', { hour: "numeric", minute: "numeric", hour12: true })
    const pastDue = date < today ? 'past due' : ''

    displayDate = `${monthDay} at ${time} <span>(${pastDue})</span>`
  }

  return (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div id="dueDateDisplay" className="overdue completed">
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          checked=""
        />
        {displayDate}
      </div>
      <Popover {...state.popover} coverTarget={true}>
        <DueDateForm
          dueDate={dueDate}
          onClose={handleClosePopoverClick}
          // onSubmit={}
          // onRemove={}
        />
      </Popover>
    </li>
  )
}

export default DueDate;