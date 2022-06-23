import React from "react";
import ReactTimeAgo from 'react-time-ago';

const Action = ({ action }) => {
  const date = new Date(action.createdAt);

  return (
    <p>
      <span className="member-name">Anonymous</span> {action.description}<small>
        at <ReactTimeAgo date={date} locale="en-US" />
      </small>
    </p>
  );
}

export default Action;