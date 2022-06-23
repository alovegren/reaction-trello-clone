import React from "react";
import { useState, useReducer } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import Labels from "../Labels/Labels";
import DueDate from "./DueDate";

import CardPreEditDescription from "./CardPreEditDescription";
import CardEditingDescription from "./CardEditingDescription";

import AddComment from "../Activities/AddComment";
import ActivitySection from "../Activities/ActivitySection";

import CardTitle from "./CardTitle";

const CardView = () => {
  const { card_id: cardId } = useParams();
  const { board_id: boardId } = useParams();

  const cards = useSelector(state => state.cards);
  const card = cards.find(card => card._id === cardId);
  const lists = useSelector(state => state.lists);
  const list = lists.find(list => list._id === card.listId)

  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const handleEditDescriptionClick = () => {
    setIsEditingDescription(true)
  }

  const handleExitEditDescriptionClick = () => {
    setIsEditingDescription(false)
  }

  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const initState = {
    popover: {
      visible: false,
      attachedTo: null,
      type: null,
    },
  };

  const [popoverState, setPopoverState] = useReducer(reducer, initState);

  const handleNewDateClick = (e) => {
    setPopoverState({
      popover: {
        visible: true,
        attachedTo: e.currentTarget,
        type: "new-board",
      },
    });
  };

  const handleClosePopoverClick = (e) => {
    e.preventDefault();
    setPopoverState(initState);
  };

  if (!card) return null;

  return (
      <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <Link to={`/boards/${boardId}`}>
          <i className="x-icon icon close-modal"></i>
        </Link>
        
        <header>
          <i className="cardView-icon icon .close-modal"></i>
          <CardTitle cardTitle={card.title} cardId={cardId} />
          <p>
            in list <a className="link">{list.title}</a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>
        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                  <Labels labelDetails={card.labels} />
                  <DueDate
                    dueDate={card.dueDate}
                    handleClosePopoverClick={handleClosePopoverClick}
                    state={popoverState}
                  />
              </ul>
              {isEditingDescription ? 
              <CardEditingDescription originalDes={card.description} handleExitEditDescriptionClick={handleExitEditDescriptionClick}/> :
              <CardPreEditDescription description={card.description} handleEditDescriptionClick={handleEditDescriptionClick}/>
              }
            </li>
            <AddComment />
            <ActivitySection />
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li onClick={handleNewDateClick} className="date-button not-implemented">
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button">
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            <li className="archive-button">
              <i className="file-icon sm-icon "></i>Archive
            </li>
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
      </div>
  );
};

export default CardView;
