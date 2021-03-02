import React, { Component } from 'react';
import { loadData } from "../../utils";

import Cards from "../CardsDeck";
import Profile from "../Profile";
import Wishlist from "../Wishlist";
import Header from "./Header";

class Layout extends Component {
  state = {
    profile: null,
    cards: [],
    page: 1,
    cardsOnPage: 100
  }

  componentDidMount() {
    const { page, cardsOnPage } = this.state;
    const userID = this.props?.match?.params?.userID;

    if (userID) {
      loadData(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res) => {
        this.setState({profile: res});
  
        return loadData(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/${(page-1)*cardsOnPage}/${page*cardsOnPage}`)
      }).then(res => {
        this.setState({cards: res});
      }).catch(error => {
        console.log(error);
      })
    };   
  };

  render() {
    const { page } = this.props;

    return (
      <>
        <Header {...this.props} profile={this.state.profile} />

        {page === "profile" && <Profile {...this.props} profile={this.state.profile} />}
        {page === "wishlist" && <Wishlist {...this.props} />}
        {page === "cards" && <Cards {...this.props} />}
      </>
    );
  }
}

export default Layout;