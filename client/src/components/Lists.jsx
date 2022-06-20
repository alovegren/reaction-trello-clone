import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createList } from '../features/lists/lists'

import List from './List'

const Lists = () => {
  console.log("Lists is rendering");

  const dispatch = useDispatch()
  const { id: boardId } = useParams();

  const [listTitle, setListTitle] = useState('');
  const [newListClass, setNewListClass] = useState('new-list');

  const [globalListWrapperClass, setGlobalListWrapperClass] = useState('list-wrapper');
  const [globalDropDownClass, setGlobalDropDownClass] = useState('add-dropdown add-bottom');

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

  // const resetNewCardDropdown = () => {
  //   setGlobalListWrapperClass('list-wrapper');
  //   setGlobalDropDownClass('add-dropdown add-bottom');
  // }

  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className='existing-lists'>
      {lists.map(list => <List
        key={list._id}
        list={list}
        listId={list._id}
        globalListWrapperClass={globalListWrapperClass}
        setGlobalListWrapperClass={setGlobalListWrapperClass}
        globalDropDownClass={globalDropDownClass}
        setGlobalDropDownClass={setGlobalDropDownClass}
        // resetNewCardDropdown={resetNewCardDropdown}
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