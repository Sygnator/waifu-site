import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/Main.js";
import User from "./components/User.js";
import Cards from "./components/CardsDeck.js";
import Profile from "./components/Profile.js";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Main {...props} />} />
      <Route exact path="/user/:userID" render={(props) => <User {...props} />} />
      <Route exact path="/user/:userID/Cards" render={(props) => <Cards {...props} />} />
      <Route exact path="/user/:userID/Profile" render={(props) => <Profile {...props} />} />
    </Switch>
  );
}

export default App;