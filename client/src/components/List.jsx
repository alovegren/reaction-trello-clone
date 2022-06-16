import React from 'react'
import Cards from './Cards'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { updateList } from '../features/lists/lists';

const List = ({ listId, list }) => {
  const dispatch = useDispatch()
  const [titleClicked, setTitleClicked] = useState(false)
  const [listTitle, setListTitle] = useState(list.title)
  
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

  return (
    <div className="list-wrapper">
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
                  <div className="add-dropdown add-bottom">
                    <div className="card">
                      <div className="card-info"></div>
                      <textarea name="add-card"></textarea>
                      <div className="members"></div>
                    </div>
                    <a className="button">Add</a>
                    <i className="x-icon icon"></i>
                    <div className="add-options">
                      <span>...</span>
                    </div>
                  </div>
                  <div className="add-card-toggle" data-position="bottom">
                    Add a card...
                  </div>
                </div>
      </div>
    </div>
  );
}

export default List;