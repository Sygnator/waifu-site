import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/Main.js";
import User from "./components/User.js";
import Cards from "./components/CardsDeck.js";
import Profile from "./components/Profile.js";
import Wishlist from "./components/Wishlist.js";

import Test from "./components/test.js";
import Test2 from "./components/testCard.js";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Main {...props} />} />
      <Route exact path="/test/:userID" render={(props) => <Test props={props} pageValue={0} />} />
      <Route exact path="/test2/:userID" render={(props) => <Test2 props={props} pageValue={1} />} />
      <Route exact path="/user/:userID" render={(props) => <User {...props} />} />
      <Route exact path="/user/:userID/Cards" render={(props) => <Cards {...props} />} />
      <Route exact path="/user/:userID/Profile" render={(props) => <Profile {...props} />} />
      <Route exact path="/user/:userID/Wishlist" render={(props) => <Wishlist {...props} />} />
    </Switch>
  );
}

export default App;
