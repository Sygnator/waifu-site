import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./components/Main.js";
import Cards from "./components/CardsDeck.js";
import CardP from "./components/CardPreview.js";
import CardsUnique from "./components/CardsUnique.js";
import CardsUltimate from "./components/CardsUltimate.js";
import Profile from "./components/Profile.js";
import Wishlist from "./components/Wishlist.js";
import Test from "./components/Test.js";
import Q from "./components/question.js";


function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Main {...props} />} />
      <Route exact path="/Test" render={(props) => <Test {...props} />} />
      <Route exact path="/question-generator" render={(props) => <Q {...props} />} />
      
      <Route exact path="/card/:cardID" render={(props) => <CardP {...props} />} />
      
      <Route exact path="/cards/unique" render={(props) => <CardsUnique {...props} />} />
      <Route exact path="/cards/unique/:cardID" render={(props) => <CardsUnique {...props} haveCardID={true} />} />

      <Route exact path="/cards/ultimate" render={(props) => <CardsUltimate {...props} />} />
      <Route exact path="/cards/ultimate/:cardID" render={(props) => <CardsUltimate {...props} haveCardID={true} />} />
      
      <Route exact path="/user/:userID/Cards" render={(props) => <Cards {...props} />} />
      <Route exact path="/user/:userID/Profile" render={(props) => <Profile {...props} />} />
      <Route exact path="/user/:userID/Wishlist" render={(props) => <Wishlist {...props} />} />
      <Route exact path="/user/:userID/Card/:cardID" render={(props) => <Cards {...props} haveCardID={true} />} />
    </Switch>
  );
}

export default App;
