import React from "react";
import Member from "./Member";

import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const ActivitySection = () => {
  const { card_id: cardId } = useParams();

  const allComments = useSelector(state => state.comments);
  const allActions = useSelector(state => state.actions);

  const allCommentsAndActions = allComments.concat(allActions);
  const members = allCommentsAndActions.filter(member => (
    member.cardId === cardId
  ));

  members.sort((memberA, memberB) => {
    const dateA = new Date(memberA.createdAt);
    const dateB = new Date(memberB.createdAt);
    
    return dateB - dateA;
  });

  return (
    <li className="activity-section">
      <h2 className="activity-icon icon">Activity</h2>
      <ul className="horiz-list">
        <li className="not-implemented">Show Details</li>
      </ul>
      <ul className="modal-activity-list">
        {members.map(member => (
          <Member key={member._id} member={member} />
        ))}
      </ul>
    </li>
  );
}

export default ActivitySection;