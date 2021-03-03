import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  CircularProgress,
  Link,
  Container,
  Divider,
  Paper,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";

import Pagination from '@material-ui/lab/Pagination';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import axios from "axios";
import Button from '@material-ui/core/Button';
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

    [theme.breakpoints.between('xs', 'xs')]: {
      maxWidth: 380,
      minWidth: 380,
      maxHeight: 566,
      padding: 4,
    },
  },
  card_content: {
    textAlign: "center",
    color: "#c1c1c1",
  },
  card_img: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 220,

    [theme.breakpoints.between('xs', 'xs')]: {
      width: 320,
      marginTop: 10,
    },
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
    marginBottom: 40,
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
  profile: {
    marginTop: -30,
  },
  profile_container: {
    margin: 0,
    padding: 0,
  },
  profile_item: {
    position: "relative",
    minHeight: 70,
  },
  profile_item_avatar: {
    position: "absolute",
    width: 150,
    height: 150,
    right: 0,
    bottom: 0,
    padding: 4,
    border: "2px solid #20232a",
    background: "linear-gradient(to bottom, #20232a, #30333a)",

    "& .MuiAvatar-img": {
      borderRadius: "50%",
    },
  },
  profile_item_name: {
    color: "#f50057",
    marginTop: 5,
    marginLeft: 10,
  },
  profile_item_rank: {
    color: "#ab003c",
    marginLeft: 10,
  },
  cards_container: {
    marginTop: 20,

    [theme.breakpoints.between('xs', 'xs')]: {
      marginTop: 2,
    },
  },
  chip_container: {
    marginLeft: "auto",
    marginBottom: 10,
    marginRight: 30,
  },
  includeTags: {
    backgroundColor: "#2e7d3255",
    border: "1px solid #1b5e2055",
    color: "#c1c1c1",
    marginRight: 5,
    marginBottom: 5,
  },
  excludeTags: {
    backgroundColor: "#c6282855",
    border: "1px solid #b71c1c55",
    color: "#c1c1c1",
    marginRight: 5,
    marginBottom: 5,
  },
  tag_icon: {
    color: "#c1c1c1",
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
  dialogContainer: {
    borderRadius: "8px",
    backgroundColor: "#30333a00",

    "& .MuiDialog-paper": {
      backgroundColor: "#00000000",
      opacity: "1",
      // width: "100%",
      // height: "100%",
    },

    "& .MuiPaper-rounded": {
      borderRadius: "10px",
    },
  },
  dialogTitle: {
    backgroundColor: "#30333a",
    color: "#fff",
    padding: "10px 16px",

    "& h2": {
      fontSize: 15,
    },
  },
  dialogContent: {
    backgroundColor: "#30333a",
    color: "#c1c1c1",
  },
  dialogActions: {
    backgroundColor: "#30333a",

    "& button": {
      color: "#fff",
      width: "100%",
      height: "100%",
    },

    "& button:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.01)",
    },

  },
  dialogImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",

    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  dialogDetails: {
    fontSize: 18,

    "& p": {
      marginTop: 6,
      marginBottom: 6,
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

    const [localFilter, setLocalFilter] = useState(JSON.parse(localStorage.getItem(`u${userID}filter`)));
    const localCardsOnPage = JSON.parse(localStorage.getItem(`cardsOnPage`));

    const emptyFilter = {
      orderBy: "id",
      includeTags: [],
      excludeTags: [],
      searchText: null
    };

    const [nick, setNick] = useState();

    useEffect(() => {
      const lastVisited =JSON.parse(localStorage.getItem(`lastVisited`))

      if (lastVisited!==null) {
        lastVisited.forEach(element => {
          if(element!==null) {
            if (element.id==userID) {
              setNick(element.name)
            }
          }
        });
      }
    }, []);

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
        }).catch((error)=>{
          setStatus(415)
        })
    }
  }, [page, cardsOnPage]);

  const cardIcon = (waifuCard) => {
    const { isTradable, isInCage, isUnique, isUltimate, hasCustomImage, hasCustomBorder, isOnExpedition, affection, tags, isActive, value } = waifuCard
    return (
      <p className={classes.card_icon}>
        {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
        {`${tags.map((e)=> e.toLowerCase()).indexOf("galeria") > -1 ? "📌" : ""}`}
        {`${isUnique ? "💠" : ""}`}
        {`${isUltimate ? "🎖️" : ""}`}
        {`${hasCustomImage ? "🖼️" : ""}`}
        {`${hasCustomBorder ? "✂️" : ""}`}
        {`${affection==="Pogarda" ? "💔" : ""}`}
        {`${isTradable ? "" : "⛔"}`}
        {`${isInCage ? "🔒" : ""}`}
        {`${isActive ? "☑️" : ""}`}
        {`${value==="hight" ? "💰" : ""}`}
        {`${value==="low" ? "♻️" : ""}`}
        {`${isOnExpedition ? "✈️" : ""}`}
      </p>
    )
  }

  const getWaifuCard = (waifuCard, index) => {
      const { id, imageUrl, name, animeTitle, characterUrl } = waifuCard
      //console.log(tags)
      return (
          <Grid item key={id} >
              <Card className={classes.card_item} >
                <CardActionArea onClick={handleOpenCardDetails(index)}>
                  <div className={classes.card_img}>
                    <LazyCardMedia image={imageUrl} alt={id} {...props} ></LazyCardMedia>
                  </div>
                </CardActionArea>
                  <CardContent className={classes.card_content}>
                    <a className={classes.card_id}>{id}</a>: <Link className={classes.card_name} href={characterUrl} target="_blank">{name}</Link>
                    {cardIcon(waifuCard)}
                    {`${animeTitle}`}
                  </CardContent>
              </Card>
          </Grid>
      )
  }

  {/* TODO Add version cards */}
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

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const CardDetails = (index, cardsData) => {
    const card = cardsData[index];

    return (
      <div>
        {card ?
        <Dialog
          open={openDetails}
          // TransitionComponent={Transition}
          keepMounted
          maxWidth={"lg"}
          onClose={handleCloseCardDetails}
          aria-labelledby="card-details"
          // aria-describedby="alert-dialog-slide-description"
          className={classes.dialogContainer}
        >
          <DialogTitle className={classes.dialogTitle} id="card-details">
            {card ?
              (
                <>
                <div style={{display: "flex"}}>
                  <div style={{marginRight: "auto"}}>{card.id}</div>
                  <div style={{marginLeft: "auto"}}>{cardIcon(card)}</div>
                </div>
                </>
              ): ""}
          </DialogTitle>
          <DialogContent className={classes.dialogContent} dividers>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                  <div className={classes.dialogImage}>
                    <LazyCardMedia image={card.imageUrl} alt={card.id} {...props} ></LazyCardMedia>
                  </div>
              </Grid>
              <Grid item sm={6} xs={12} className={classes.dialogDetails}>
                <p style={{fontSize: 22, marginBottom: 0,}}><a style={{color: "#f50057", textDecoration: "none"}} href={card.characterUrl}>{card.name}</a></p>
                <p style={{fontSize: 20, marginTop: 0,}}>{card.animeTitle}</p>
                <Divider />
                <p style={{display: "flex", marginBottom: 15,}}><div><b>❤️</b>{card.finalHealth} ({card.baseHealth}) <b>🔥</b>{card.attack} <b>🛡️</b>{card.defence}</div><div style={{marginLeft: "auto"}}></div></p>
                {/* <Divider /> */}
                <p><b>Relacja: </b>{card.affection}</p>
                <p><b>Dere: </b>{`${card.dere[0].toUpperCase()}${card.dere.slice(1)}`}</p>
                <p><b>Dostępne ulepszenia: </b>{card.upgradesCnt}</p>
                <p><b>Restarty: </b>{card.restartCnt}</p>
                <p><b>Doświadczenie: </b>{`${Math.floor(card.expCnt*1000)/1000}/${card.expCntForNextLevel}`}</p>
                <p><b>Pochodzenie: </b>{card.source}</p>
                <p><b>Moc: </b>{Math.floor(card.cardPower*1000)/1000}</p>
                {card.isUltimate ? <p><b>Ultimate: </b>{card.ultimateQuality}</p> : ""}
                {/* <Divider /> */}
                {/* <p style={{fontSize: 12}}>{card.createdAt}</p> */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions} >
            {index>0 ?
              <Button onClick={handleIndexDown} color="secendary" style={{marginLeft: "auto", marginRight: "auto"}}>
                <ArrowBackIosIcon />
              </Button>
            : ""}
            {cardsData.length>index+1 ?
              <Button onClick={handleIndexUp} color="secendary" style={{marginRight: "auto", marginLeft: "auto"}}>
                <ArrowForwardIosIcon />
              </Button>
            : ""}
          </DialogActions>
        </Dialog>
        : ""}
      </div>
    );
}
  const [openDetails, setOpenDetails] = React.useState(false);
  const [detailsIndex, setDetailsIndex] = React.useState(-1);

  const handleOpenCardDetails = (index) => () => {
    setDetailsIndex(index)
    setOpenDetails(true);
  }

  const handleCloseCardDetails = () => {
    setOpenDetails(false);
  }

  const handleIndexUp = () => {
    setDetailsIndex(detailsIndex+1);
  }

  const handleIndexDown = () => {
    setDetailsIndex(detailsIndex-1);
  }

  // let xxx;

  // const handleChipDeleteInclude = (tag) => () => {
  //   let newArr = []

  //   const upfilter = {
  //     orderBy: localFilter.orderBy,
  //     includeTags: newArr,
  //     excludeTags: localFilter.excludeTags,
  //     searchText: localFilter.searchText
  //   };

  //   localFilter.includeTags.map((t)=> t===tag ? undefined : newArr.push(t))
  //   setLocalFilter(upfilter);

  //   clearTimeout(xxx);//not work
  //   xxx = setTimeout(function(){
  //     console.log("x");

  //   }, 3000);
  // }

  // const handleChipDeleteExclude = (tag) => () => {
  //   console.log("x");
  // }

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

          <Grid container justify="center" spacing={2} className={classes.mainPage}>
          <Grid item md={4} xs={12} className={classes.profile} container>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="center" className={classes.profile_container}>
                    <Grid item xl={5} lg={6} md={7} sm={4} xs={5} className={classes.profile_item}>
                      <Avatar src={`https://cdn.shinden.eu/cdn1/avatars/225x350/${userID}.jpg`} alt="avatar.jpg" className={classes.profile_item_avatar} />
                    </Grid>
                    <Grid item xl={7} lg={6} md={5} sm={8} xs={7} className={classes.profile_item}>
                      <Typography variant="h5" display="block" className={classes.profile_item_name} noWrap>{nick===undefined ? "????" : nick}</Typography>
                      <Typography variant="h7" className={classes.profile_item_rank} noWrap>{profileData ? profileData.userTitle : "???"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
          </Grid>
          <Grid item md={8} xs={12} container>
            {cardsData&&profileData ? (
              <>
                <div className={classes.chip_container}>
                  {localFilter.includeTags.map((tag)=>{
                    return (<Chip className={classes.includeTags} clickable={false} label={tag}/>) /* onDelete={handleChipDeleteInclude(tag)} />) */
                  })}{/* icon={<CheckIcon className={classes.tag_icon} />} */}
                  {localFilter.excludeTags.map((tag)=>{
                    return (<Chip className={classes.excludeTags} clickable={false} label={tag}/>) /* onDelete={handleChipDeleteExclude(tag)} />) */
                  })}{/* icon={<CloseIcon className={classes.tag_icon} />} */}
                </div>
            </>
            ) : ""}
          </Grid>

            {cardsData&&profileData ? (
              <>
                <Grid item xs={12} justify="center" spacing={1} className={classes.cards_container} container>
                  {pageVersion ? cardsData.map((card, index)=>getWaifuCard(card, index)) : getWaifuCardList(cardsData)}
                  {pageCount>1 ? renderPagination(page, pageCount) : ""}
                </Grid>
                {CardDetails(detailsIndex, cardsData)}
              </>
            ) : (
              status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
              status===415 ? <p className={classes.error404}><span>415</span><br />Nie pobrano kart użytkownika. <br /> Spróbuj odświeżyć stronę lub zgłoś błąd na discord.</p> :
              <CircularProgress className={classes.CircularProgress} size={100}/>
            )}
          </Grid>

    </>
    )
}

export default CardsDeck;