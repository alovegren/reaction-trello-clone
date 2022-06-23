import React from 'react'
import Cards from '../Cards/Cards'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { updateList } from '../../features/lists/lists';

const List = ({ listId, list, activeListId, setActiveListId, onOpenCardClick }) => {
  
  const dispatch = useDispatch()

  const [titleClicked, setTitleClicked] = useState(false)
  const [listTitle, setListTitle] = useState(list.title)

  const active = activeListId === listId
  const listWrapperClass = active ? 'list-wrapper add-dropdown-active' : 'list-wrapper';

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
          <Cards listId={listId} active={active} setActiveListId={setActiveListId} onOpenCardClick={onOpenCardClick} />
        </div>
      </div>
    </div>
  );
}

export default List;