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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import Footer from "./Module/Footer";

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import axios from "axios";

import LazyCardMedia from "./Module/LazyCardMedia.js";
import CardIcons from './Card/CardIcons.js';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 35%",
    backgroundSize: "cover",
    height: "330px",
  },
  foreground: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    margin: "auto",
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
  wishlist_title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 30,
    color: "#c1c1c1",
  },
  wishlist_table_container: {
    padding: 15,
    // hidden table scroll
    overflow: "hidden",
    marginBottom: 70,
    [theme.breakpoints.up('md')]: {
      marginRight: 100,
      marginLeft: 100,
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: 200,
      marginLeft: 200,
    },
  },
  // wishlist_table: {
  //   border: "1px solid #424242",
  // },
  wishlist_table_head: {
    backgroundColor: "#232427",
  },
  wishlist_table_th: {
    textAlign: "center",
    borderBottom: "2px solid #ab003ce8",
    color: "#f50057",
  },
  wishlist_table_td1: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#323438",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  wishlist_table_td2: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#2b2d31",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  wishlist_name: {
    textDecoration: "none",
    color: "#c1c1c1",

    "&:hover": {
      color: "#f50057",
    }
  },
  profile: {
    marginTop: -30,
    marginBottom: -20,
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
    // border: "2px solid #20232a",
    boxShadow: "0px 0px 22px 2px rgb(0 0 0 / 14%)",
    background: "linear-gradient(to bottom, #f50057, #f5005788)",

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
  CircularProgress: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ab003c",
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
  image: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "85%",
    maxHeight: "667px",
    maxWidth: "475px",

    "& img": {
        width: "85%",
      },
    "& button": {
      color: "#c1c1c1",
      marginTop: "6px",
    },
  },
  details: {
    color: "#c1c1c1",
    fontSize: 18,

    "& p": {
      marginTop: 6,
      marginBottom: 6,
    }
  },
}));

function type(cardType) {
  if(cardType==="title") return "Tytuł";
  if(cardType==="character") return "Postać";
  if(cardType==="card") return "Karta";
  return "Inny";
}
function name(type, name, id, classes, profileColor) {
  if(name==="None") name="????"
  if(type==="title") return <a href={`https://shinden.pl/t/${id}`} target="_blank" className={classes.wishlist_name} style={profileColor ? {color: profileColor ? profileColor : "#f50057"} : {}}>{name}</a>;
  if(type==="character") return <a href={`https://shinden.pl/character/${id}`} target="_blank" className={classes.wishlist_name} style={profileColor ? {color: profileColor ? profileColor : "#f50057"} : {}}>{name}</a>;
  if(type==="card") return name;
  return {name};
}

const Wishlist = (props) => {

    const { match } = props;
    const { params } = match;
    const { cardID } = params;

    const classes = useStyles();

    const [status, setStatus] = useState();
    const [img, setImg] = useState(0);
    const [card, setCard] = useState();


    useEffect(async () => {
      if(card===undefined) {
          await axios.get(`https://api.sanakan.pl/api/waifu/card/${cardID}/view`).then((res)=> {
              const newCard = res.data;
              setCard({...newCard, date: new Date(newCard.createdAt), scalpelDate: new Date(newCard.scalpelAt)});
              setStatus(res.status)
          }).catch((error)=>{
            console.log("eerr");
            setStatus(404)
          })
      }
    }, []);

      const handleImage = () => {
        setImg(!img)
      }

    const onKeyPress = (key) => {
        //right
        if(key===39) {
            handleImage()
        }
        //left
        if(key===37) {
            handleImage()
        }
      }

    return (
      <>
        <Paper className={classes.root} >
            <div className={classes.foreground}></div>
            <Toolbar props={props} pageValue={-1}/>
          <div className={classes.shadow} ></div>
        </Paper>
        <Grid container justify="center" spacing={2} className={classes.mainPage}>
          <Grid item md={8} xs={12} container></Grid>
          <Grid item xs={12} className={classes.wishlist_table_container} container>
          {status===200 ? (
            <>
            <Grid container spacing={2} style={{marginBottom: "6px"}}>
            <Grid item sm={6} xs={12} style={{textAlign: "center",color: "#c1c1c1", fontSize: "16px"}}>
             ID karty: {card.id}
            </Grid>
            <Grid item sm={6} xs={12} style={{textAlign: "center"}}>
            <CardIcons
                {...props}
                card={card}
                />
            </Grid>
            </Grid>
            {/* <div style={{width: "100%",marginTop: "20px", textAlign: "Center"}}>test<Divider /></div> */}
            
            <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
                <div className={classes.image}>
                  <LazyCardMedia image={img ? card.profileImageUrl : card.imageUrl} alt={card.id} {...props}></LazyCardMedia>
                  <Button onClick={handleImage} color="secendary" style={{marginLeft: "auto", marginRight: "auto", width: "100%"}}>
                    <ArrowBackIosIcon /><ArrowForwardIosIcon />
                    </Button>
                </div>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.details}>
              <p style={{fontSize: 22, marginBottom: 0,}}><Link style={{color: "#f50057"}} href={card.characterUrl} target="_blank">{card.name}</Link></p>
              <p style={{fontSize: 20, marginTop: 0,}}>{card.animeTitle}</p>
              
              <Divider />
              <p style={{display: "flex", marginBottom: 15, fontFamily: "Arial",}}><div><b>❤️</b>{card.finalHealth} ({card.baseHealth}) <b>🔥</b>{card.attack} <b>🛡️</b>{card.defence}</div><div style={{marginLeft: "auto"}}></div></p>
              <p><b>Relacja: </b>{card.affection}</p>
              <p><b>Dere: </b>{`${card.dere[0].toUpperCase()}${card.dere.slice(1)}`}</p>
              <p><b>Dostępne ulepszenia: </b>{card.upgradesCnt}</p>
              <p><b>Restarty: </b>{card.restartCnt}</p>
              <p><b>Doświadczenie: </b>{`${Math.floor(card.expCnt*1000)/1000}/${card.expCntForNextLevel}`}</p>
              <p><b>Pochodzenie: </b>{card.source}</p>
              <p><b>Moc: </b>{Math.floor(card.cardPower*1000)/1000}</p>
              {card.isUltimate ? <p><b>Ultimate: </b>{card.ultimateQuality}</p> : ""}
              {card.whoWantsCount > 0 ? <p><b>Liczba KC: </b>{card.whoWantsCount}</p> : ""}
              <p><b>Stworzono: </b>{`${card.date.getDate()}.${card.date.getMonth()+1 <= 9 ? `0${card.date.getMonth()+1}` : card.date.getMonth()+1}.${card.date.getFullYear()} r. ${card.date.getHours()}:${card.date.getMinutes()<10 ? "0"+card.date.getMinutes() : card.date.getMinutes()}`}</p>
              {card.scalpelDate.getTime() > 1682892000000 && card.hasCustomImage ? (<p>
                <b>Ustawiono obrazek: </b>{`${card.scalpelDate.getDate()}.${card.scalpelDate.getMonth() + 1 <= 9 ? `0${card.scalpelDate.getMonth() + 1}` : card.scalpelDate.getMonth() + 1}.${card.scalpelDate.getFullYear()} r. ${card.scalpelDate.getHours()}:${card.scalpelDate.getMinutes()<10 ? "0"+card.scalpelDate.getMinutes() : card.scalpelDate.getMinutes()}`}
              </p>) : ""}
              {card.username ? <p><b>Należy do: </b><Link href={`#/user/${card.shindenId}/profile`} style={{color: "#f50057"}}>{card.username}</Link></p> : ""}
              <Divider />
              <p><b>Tagi: </b>{card.tags.join(", ")}</p>
            </Grid>
          </Grid>
            </>
            ) : (
                status===404 ? <p className={classes.error404}><span>Error 404</span><br />Ogólny błąd strony.</p> :
                status===204 ? <p className={classes.error404}><span>Error</span><br />Nie znaleziono karty.</p> :
                <CircularProgress className={classes.CircularProgress} size={100}/>
            )}
          </Grid></Grid>
        <Footer />
    </>
    )
}

export default Wishlist;