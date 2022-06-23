import React from "react";
import SingleLabel from "./SingleLabel";

const Labels = ({ labelDetails }) => {
  return (
  <>
    <li className="labels-section">
      <h3>Labels</h3>
      { labelDetails.map(label => <SingleLabel key={label} color={label} />) }
      <div className="member-container">
        <i className="plus-icon sm-icon"></i>
      </div>
    </li>
  </>
  )
}

export default Labels;