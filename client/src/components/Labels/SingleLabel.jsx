import React from "react";

const SingleLabel = ({ color }) => {
  return (
    <div className="member-container">
      <div className={`${color} label colorblindable`}></div>
    </div>
  )
}

export default SingleLabel;