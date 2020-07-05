import React from "react";

import "./Public.css";

export default (error) => (
  <div className="public container">{error.message}</div>
);
