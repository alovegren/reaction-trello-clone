import React from "react";

import Comment from "./Comment";
import Action from "./Action";

const Member = ({ member }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member">TP</div>
      </div>
      {member.text ? <Comment comment={member} /> : <Action action={member} />}
    </li>
  );
}

export default Member;