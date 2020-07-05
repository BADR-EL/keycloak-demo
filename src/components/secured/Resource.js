import React from "react";

import "./Secured.css";

const Resource = (props) => {
  return (
    <div className="secured container">
      <div>{props.resource}</div>
    </div>
  );
};

export default Resource;
