import React from "react";

import "./Secured.css";

const User = (props) => {
  return (
    <div className="secured container">
      <div>{props.phone}</div>
      <div>{props.email}</div>
      <div>{props.givenName}</div>
      <div>{props.familyName}</div>
    </div>
  );
};

export default User;
