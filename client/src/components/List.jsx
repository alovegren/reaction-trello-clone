import React from 'react'
import Cards from './Cards'
import { useState } from 'react'
import { useDispatch } from "react-redux";

import { updateList } from '../features/lists/lists';
import { createCard } from '../features/cards/cards';

const List = (props) => {
  // const globalListWrapperClass = useSelector(state => state.globalListWrapper);
  // let's try using dispatch~

  const {
    listId, list, globalListWrapperClass,
    globalDropDownClass, setGlobalListWrapperClass,
    setGlobalDropDownClass,
  } = props;

  const dispatch = useDispatch()

  const [titleClicked, setTitleClicked] = useState(false)
  const [listTitle, setListTitle] = useState(list.title)

  const [listWrapperClass, setNewListWrapperClass] = useState(globalListWrapperClass);
  const [addDropDownClass, setAddDropDownClass] = useState(globalDropDownClass);

  const [cardTitle, setCardTitle] = useState('');
  
  const handleParagraphClick = () => {
    setTitleClicked(true)
  }

  const handleTitleChange = () => {
    dispatch(updateList({ updateInfo: {"title": listTitle }, "listId": listId }))
    setTitleClicked(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTitleChange()
    }
  }

  const handleNewCardButton = () => {
    setGlobalListWrapperClass('list-wrapper');
    setGlobalDropDownClass('add-dropdown add-bottom');
    // resetNewCardDropdown();
    setNewListWrapperClass('list-wrapper add-dropdown-active');
    setAddDropDownClass('add-dropdown add-bottom active-card');
  }

  const handleCancelNewCard = () => {
    setNewListWrapperClass('list-wrapper');
    setAddDropDownClass('add-dropdown add-bottom');
  }

  const resetNewCardInput = () => {
    setCardTitle('');
  }

  const handleNewCard = () => {
    dispatch(createCard({
      newCardInput: { cardTitle, listId },
      callback: resetNewCardInput,
    }));
  }

  return (
    <div className={listWrapperClass}> 
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {titleClicked ? 
            <input className="list-title" 
                    onChange={(e) => setListTitle(e.target.value)} 
                    value={listTitle}
                    onKeyDown={handleKeyDown}
                    onBlur={handleTitleChange}
                    /> :
            <p className="list-title" onClick={handleParagraphClick}>{listTitle}</p>
            }
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <Cards listId={list._id} />
          <div className={addDropDownClass}>
            <div className="card">
              <div className="card-info"></div>
              <textarea onChange={(event) => setCardTitle(event.target.value)} name="add-card">{cardTitle}</textarea>
              <div className="members"></div>
            </div>
            <a onClick={handleNewCard} className="button">Add</a>
            <i onClick={handleCancelNewCard} className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div onClick={handleNewCardButton} className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;