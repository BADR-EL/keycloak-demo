import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Public from "./components/public/Public";
import Secured from "./containers/secured/Secured";
import User from "./containers/secured/User";
import Resource from "./containers/secured/Resource";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li>
            <Link to="/">public component</Link>
          </li>
          <li>
            <Link to="/secured">secured component</Link>
          </li>
          <li>
            <Link to="/user">user component</Link>
          </li>
          <li>
            <Link to="/resource">get secured resource</Link>
          </li>
        </ul>
        <Route exact path="/" component={Public} />
        <Route path="/secured" component={Secured} />
        <Route path="/user" component={User} />
        <Route path="/resource" component={Resource} />
      </div>
    </BrowserRouter>
  );
};

export default App;
