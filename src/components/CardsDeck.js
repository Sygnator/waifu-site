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

import Pagination from '@material-ui/lab/Pagination';

import axios from "axios";

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
  CircularProgress: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ab003c",
  },
  pagination: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

    "& nav": {
      "& ul": {
        justifyContent: "center",

        "& li": {
          "& button": {
            color: "#c1c1c1",
          },
          "& .Mui-selected": {
            backgroundColor: "#f5005733",
            color: "#f50057",
          },
          "& button:hover": {
            backgroundColor: "#f5005711",
          },
        },
      },
    },
  },
  error404: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: 32,
    color: "#c1c1c1",

    "& span": {
      fontSize: 40,
      color: "#ab003c",
    }
  },
}));

const CardsDeck = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [pageVersion, setPageVersion] = useState(true);
    const [profileData, setProfileData] = useState();
    const [cardsData, setCardsData] = useState();

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [cardsOnPage, setCardsOnPage] = useState(1);

    const [status, setStatus] = useState();

    const localFilter = JSON.parse(localStorage.getItem(`u${userID}filter`));
    const localCardsOnPage = JSON.parse(localStorage.getItem(`cardsOnPage`));

    const emptyFilter = {
      orderBy: "id",
      includeTags: [],
      excludeTags: [],
      searchText: null
    };

    const filterUpdate = (filterData) => {
      localStorage.setItem(`u${userID}filter`, JSON.stringify(filterData))
      return JSON.parse(localStorage.getItem(`u${userID}filter`));
    };

    useEffect(() => {
      if(profileData!=undefined) {
          const cardsAmount = profileData.cardsCount.total;
          if(localCardsOnPage===null) {
              setCardsOnPage(cardsAmount)
          } else {
              setCardsOnPage(localCardsOnPage)
              setPageCount(Math.ceil(cardsAmount/localCardsOnPage));
          }
      }
  }, [profileData]);

  useEffect(async () => {
    if(profileData===undefined) {
        await axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
            const newProfilData = res.data;
            setProfileData(newProfilData);
        }).catch((error)=>{
          setStatus(404)
        })
    }
  }, []);

  useEffect(async () => {
    if(localFilter===null) {
        filterUpdate(emptyFilter)
    }

    setCardsData(undefined)

    if(profileData!=undefined) {
        await axios.post(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/${(page-1)*cardsOnPage}/${page*cardsOnPage}`, localFilter).then((res)=> {
                const newWaifuCardsData = res.data.cards;
                const totakCards = res.data.totalCards;
                setStatus(200);
                setCardsData(newWaifuCardsData);
                if(totakCards<cardsOnPage) {
                    setPageCount(1);
                } else {
                    setPageCount(Math.ceil(totakCards/cardsOnPage));
                }
        })
    }
  }, [page, cardsOnPage]);

    const getWaifuCard = (waifuCard) => {
      const { id, imageUrl, name, animeTitle, characterUrl, isTradable, isInCage, isUnique, isUltimate, hasCustomImage, isOnExpedition, affection, tags } = waifuCard
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
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ""}`}
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
                          {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
                          {`${isUnique ? "💠" : ""}`}
                          {`${isUltimate ? "🎖️" : ""}`}
                          {`${hasCustomImage ? "🖼️" : ""}`}
                          {`${affection==="Pogarda" ? "💔" : ""}`}
                          {`${isTradable ? "" : "⛔"}`}
                          {`${isInCage ? "🔒" : ""}`}
                          {`${isOnExpedition ? "✈️" : ""}`}
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

  const pageChange = (event, value) => {
    setPage(value);
  };

  const renderPagination = (page, pageCount) => {
    return (
        <Grid xs={12} item justify="center" key={"pagination"}>
          <div className={classes.pagination}>
          <Pagination
              count={pageCount}
              page={page}
              onChange={pageChange}
              boundaryCount={2}
              classes={{ul: classes.ul}}
          />
          </div>
        </Grid>
    )
  }

  const backgroundImg = (profil) => {
    return (profil===undefined||profil.backgroundImageUrl===null) ?  {backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,} :
    {backgroundImage: `url(${profil.backgroundImageUrl})`,}
  }

    return (
      <>
        <Paper className={classes.root} style={backgroundImg(profileData)}>
            <Toolbar props={props} pageValue={1} showFilter={status===200 ? true : false} profileData={profileData} cardsData={cardsData} />
          <div className={classes.shadow} ></div>
        </Paper>

          {/* TODO Add avatar */}
          <Grid container justify="center" spacing={2} className={classes.mainPage}>
          {cardsData&&profileData ? (
            <>
              {pageVersion ? cardsData.map((card)=>getWaifuCard(card)) : getWaifuCardList(cardsData)}
              {pageCount>1 ? renderPagination(page, pageCount) : ""}
            </>
          ) : (
            status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
            <CircularProgress className={classes.CircularProgress} size={100}/>
          )}
          </Grid>

    </>
    )
}

export default CardsDeck;