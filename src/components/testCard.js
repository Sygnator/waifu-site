import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Link,
  Container,
  Divider,
  Paper,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";

import LazyCardMedia from "./Module/LazyCardMedia.js";
import testProf from "./TestData/testProf.js";
import testCards from "./TestData/testCard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 35%",
    backgroundSize: "cover",
    height: "330px",
  },
  shadow: {
    height: "100%",
    background: "linear-gradient(180deg,rgba(32, 35, 42,0) 40%,rgba(32, 35, 42,.6))",
  },
  mainPage: {
    width: "95%",
    minHeight: "200px",
    backgroundColor: "#30333a",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "8px",
    marginTop: -30,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "100px",
    paddingTop: 20,
  },
  card_item: {
    backgroundColor: "#2c2f35",
    maxWidth: 240,
    minWidth: 240,
    maxHeight: 433,
    height: "100%",
    width: "100%",
    padding: 4,
  },
  card_content: {
    textAlign: "center",
    color: "#c1c1c1",
  },
  card_img: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 220,
  },
  card_name: {
    color: "#f50057",
  },
  card_icon: {
    margin: 0,
    padding: 0,
  },
  card_id: {
    fontWeight: "bold",
  },
}));

const Test = ({props,pageValue}) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [pageVersion, setPageVersion] = useState(false);
    const [profileData, setProfileData] = useState(testProf);
    const [cardsData, setCardsData] = useState(testCards);

    const getWaifuCard = (waifuCard) => {
      const { id, imageUrl, name, animeTitle, characterUrl, isTradable, isInCage, isUnique, isUltimate, hasCustomImage, affection, tags } = waifuCard
      //console.log(tags)
      return (
          <Grid item key={id}>
              <Card className={classes.card_item}>
                  <div className={classes.card_img}>
                    <LazyCardMedia image={imageUrl} alt={id} {...props} ></LazyCardMedia>
                  </div>
                  <CardContent className={classes.card_content}>
                    <a className={classes.card_id}>{id}</a>: <Link className={classes.card_name} href={characterUrl} target="_blank">{name}</Link>
                      <p className={classes.card_icon}>
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ("")}`}
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
                          {`${isUnique ? "💠" : ""}`}
                          {`${isUltimate ? "🎖️" : ""}`}
                          {`${hasCustomImage ? "🖼️" : ""}`}
                          {`${affection==="Pogarda" ? "💔" : ""}`}
                          {`${isTradable ? " " : "⛔"}`}
                          {`${isInCage ? "🔒" : ""}`}
                      </p>
                    {`${animeTitle}`}
                  </CardContent>
              </Card>
          </Grid>
      )
  }

  const getWaifuCardList = (cardsData) => {
    return (
        <a>lista..</a>
    )
}

    return (
      <>
        <Paper className={classes.root}>
            <Toolbar props={props} pageValue={1} showFilter={true} profileData={profileData}/>
          <div className={classes.shadow} ></div>
        </Paper>

          <Grid container justify="center" spacing={2} className={classes.mainPage}>
            {pageVersion ? cardsData.map((card)=>getWaifuCard(card)) : getWaifuCardList(cardsData)}
          </Grid>
    </>
    )
}

export default Test;