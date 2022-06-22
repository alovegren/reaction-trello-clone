import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../features/comments/comments";
import { useParams } from "react-router-dom"
const AddComment = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('')
  const {card_id: cardId} = useParams()

  const handleSaveComment = (e) => {
    e.preventDefault();
    dispatch(createComment({commentInfo: {cardId, comment: {text: comment}}, callback: () => setComment('')}))
  }
  return ( 
  <>
  <li className="comment-section">
    <h2 className="comment-icon icon">Add Comment</h2>
    <div>
      <div className="member-container">
        <div className="card-member">TP</div>
      </div>
      <div className="comment">
        <label>
          <textarea
            required=""
            rows="1"
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
            <a className="light-button attachment-icon sm-icon"></a>
          </div>
          <div>
            <input
              type="submit"
              className="button"
              value="Save"
              onClick={handleSaveComment}
            />
          </div>
        </label>
      </div>
    </div>
  </li>
  </>
  )
}

export default AddComment;