import React from "react";
import ReactTimeAgo from 'react-time-ago';

const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);

  return (
    <>
      <div className="comment static-comment">
        <span>{comment.text}</span>
      </div>
      <small>
          <ReactTimeAgo date={date} locale="en-US" /> - <span className="link">Edit</span> -{" "}
          <span className="link">Delete</span>
      </small>
      <div className="comment">
        <label>
          <textarea required="" rows="1" value={comment.text} />
          <div>
            <a className="light-button card-icon sm-icon"></a>
            <a className="light-button smiley-icon sm-icon"></a>
            <a className="light-button email-icon sm-icon"></a>
          </div>
          <div>
            <p>You haven&apos;t typed anything!</p>
            <input
              type="submit"
              className="button not-implemented"
              value="Save"
            />
            <i className="x-icon icon"></i>
          </div>
        </label>
      </div>
    </>
  );
}

export default Comment;