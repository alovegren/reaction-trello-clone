import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createList } from '../features/lists/lists'

import List from './List'

const Lists = () => {
  const [activeListId, setActiveListId] = useState('')

  const dispatch = useDispatch()
  const { board_id: boardId } = useParams();

  const [listTitle, setListTitle] = useState('');
  const [newListClass, setNewListClass] = useState('new-list');

  const lists = useSelector(state => state.lists);

  const handleAddListButton = () => {
    setNewListClass(`${newListClass} selected`);
  }

  const handleCancelAddListButton = () => {
    setNewListClass('new-list');
  }

  const resetListInput = () => {
    setListTitle('');
  }

  const handleNewList = (event) => {
    event.preventDefault();
    dispatch(createList({
      newListInput: { listTitle, boardId },
      callback: resetListInput, 
    }));
  };

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className='existing-lists'>
      {lists.map(list => <List
        key={list._id}
        list={list}
        listId={list._id}
        activeListId={activeListId}
        setActiveListId={setActiveListId}
        />)}
      </div>
      <div id="new-list" className={newListClass}>
        <span onClick={handleAddListButton}>Add a list...</span>
        <input type="text"
          onChange={(event) => setListTitle(event.target.value)}
          value={listTitle}
          placeholder="Add a list..."
        />
        <div>
          <input onClick={handleNewList} type="submit" className="button" value="Save" />
          <i onClick={handleCancelAddListButton} className="x-icon icon"></i>
        </div>
      </div>
    </div>
  );
}

export default Lists;