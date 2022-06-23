import React from "react";

const CardLabel = ({ color }) => {
  return (
    <div className={`card-label ${color} colorblindable`}></div>
  );
}

export default CardLabel;