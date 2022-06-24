import React from "react";

const DueDate = ({ dueDate }) => {
  let displayDate;
  let pastDue;

  if (!dueDate) {
    displayDate = "No Due Date";
  } else {
    const date = new Date(dueDate);
    const today = new Date();
    const monthDay = date.toLocaleString('en-US', { month: 'short', day: 'numeric'});
    const time = date.toLocaleString('en-US', { hour: "numeric", minute: "numeric", hour12: true });
    pastDue = date < today ? ' (past due)' : '';

    displayDate = `${monthDay} at ${time}`
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
        {displayDate}<span>{pastDue}</span>
      </div>
    </li>
  )
}

export default DueDate;