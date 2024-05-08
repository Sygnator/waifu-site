import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@material-ui/core";

/* Icons */
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import LazyCardMedia from '../Module/LazyCardMedia.js';
import CardIcons from './CardIcons.js';

const useStyles = makeStyles((theme) => ({
  dialogContainer: {
    borderRadius: "8px",
    backgroundColor: "#30333a00",
    // width: "100%",
    // height: "100%",

    "& .MuiDialog-paper": {
      backgroundColor: "#00000000",
      opacity: "1",
      width: "100%",
      height: "80%",
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
    overflow: "hidden",
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
    width: "85%",
    height: "85%",

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

const CardDetails = (props) => {
  const {
    index,
    userColor,
    cardsData,
    openDetails,
    handleIndexUp,
    handleIndexDown,
    handleCloseCardDetails,
  } = props;

  const classes = useStyles();

  const card = cardsData[index];

  let cardDate 
  let scalpelDate

  if (card) {
    cardDate = new Date(card.createdAt);
    scalpelDate = new Date(card.scalpelAt);
  }

  const onKeyPress = (key) => {
    //right
    if(key===39) {
      handleIndexUp()
    }
    //left
    if(key===37) {
      handleIndexDown()
    }
  }

  return (
    <div onKeyDown={(e)=>onKeyPress(e.keyCode)}>
      {card ?
      <Dialog
        open={openDetails}
        // TransitionComponent={Transition}
        keepMounted
        maxWidth={"md"}
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
                <div style={{marginLeft: "auto"}}>
                  {/* {cardIcon(card)} */}
                  <CardIcons
                    {...props}
                    card={card}
                  />
                </div>
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
              <p style={{fontSize: 22, marginBottom: 0,}}><a style={{color: userColor ? userColor : "#f50057", textDecoration: "none"}} href={card.characterUrl} target="_blank">{card.name}</a></p>
              <p style={{fontSize: 20, marginTop: 0,}}>{card.animeTitle}</p>
              <Divider />
              <p style={{display: "flex", marginBottom: 15, fontFamily: "Arial",}}><div><b>❤️</b>{card.finalHealth} ({card.baseHealth}) <b>🔥</b>{card.attack} <b>🛡️</b>{card.defence}</div><div style={{marginLeft: "auto"}}></div></p>
              <p><b>Relacja: </b>{card.affection}</p>
              <p><b>Dere: </b>{`${card.dere[0].toUpperCase()}${card.dere.slice(1)}`}</p>
              <p><b>Dostępne ulepszenia: </b>{card.upgradesCnt}</p>
              <p><b>Restarty: </b>{card.restartCnt}</p>
              <p><b>Doświadczenie: </b>{`${Math.floor(card.expCnt*1000)/1000}/${card.expCntForNextLevel}`}</p>
              <p><b>Pochodzenie: </b>{card.source}</p>
              <p><b>Zmęczenie: </b>{card.fatigue}</p>
              <p><b>Moc: </b>{Math.floor(card.cardPower*1000)/1000}</p>
              {card.isUltimate ? <p><b>Ultimate: </b>{card.ultimateQuality}</p> : ""}
              {card.whoWantsCount > 0 ? <p><b>Liczba KC: </b>{card.whoWantsCount}</p> : ""}
              <p><b>Stworzono: </b>{`${cardDate.getDate()}.${cardDate.getMonth()+1 <= 9 ? `0${cardDate.getMonth()+1}` : cardDate.getMonth()+1}.${cardDate.getFullYear()} r. ${cardDate.getHours()}:${cardDate.getMinutes()<10 ? "0"+cardDate.getMinutes() : cardDate.getMinutes()}`}</p>
              {scalpelDate.getTime() > 1682892000000 && card.hasCustomImage ? (<p>
                <b>Ustawiono obrazek: </b>{`${scalpelDate.getDate()}.${scalpelDate.getMonth() + 1 <= 9 ? `0${scalpelDate.getMonth() + 1}` : scalpelDate.getMonth() + 1}.${scalpelDate.getFullYear()} r. ${scalpelDate.getHours()}:${scalpelDate.getMinutes()<10 ? "0"+scalpelDate.getMinutes() : scalpelDate.getMinutes()}`}
              </p>) : ""}
              {card.username ? <p><b>Należy do: </b><Link href={`#/user/${card.shindenId}/profile`} style={{color: "#f50057"}}>{card.username}</Link></p> : ""}
              <Divider />
              <p><b>Tagi: </b>{card.tags.join(", ")}</p>
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

export default CardDetails;