import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
// import ImageIcon from '@material-ui/icons/Image';
import LockIcon from '@mui/icons-material/Lock';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BlockIcon from '@mui/icons-material/Block';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Slide,
    Typography,
    IconButton,
    Toolbar,
    AppBar,
    Dialog,
} from "@material-ui/core";

import {ValueChart, ValueChartData} from "./../Chart/cardValueChart";
import {AffectionChart, AffectionChartData} from "./../Chart/cardAffectionChart";
import {DereChart, DereChartData} from "./../Chart/cardDereChart";
import {RarityChart, RarityChartData} from "./../Chart/cardRarityChart";
import {TagChart, TagChartData} from "./../Chart/cardTagChart";
import {ImageChart, ImageChartData} from "./../Chart/cardImageChart";

  const useStyles = makeStyles((theme) => ({
    dialogContainer: {
      backgroundColor: "#30133a00",
      width: "100%",
      height: "100%",

      "& .MuiDialog-paper": {
        backgroundColor: "#2f3237",
        opacity: "1",
        width: "100%",
        height: "100%",
      },
    },
    AppBar: {
      backgroundColor: "rgba(32, 35, 42, .5)",
    },
    gridI: {
      color: "#ffffff",
      // padding: 50,
      paddingTop: 0,
      paddingLeft: 50,
      paddingRight: 50,
      textAlign: '-webkit-center',
    },
    gridITop: {
      color: "#ffffff",
      // padding: 50,
      paddingTop: 0,
      paddingLeft: 50,
      paddingRight: 50,
    },
    highlight: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    circle: {
      marginTop: "10px",
      backgroundColor: "rgba(32, 35, 42, .5)",
      borderRadius: "50%",
      alignItems: "center",
      height: 45,
      width: 45,
      display: "grid",
    },
    wrap: {
      paddingTop: "10px",
      paddingLeft: "10px",
    },
    label: {
      color: "#c1c1c1",
      fontWeight: 600,
      fontSize: "20px",
    },
    value: {
      fontSize: "35px",
      fontWeight: 600,
      textAlign: "left",
      color: 'rgba(54, 162, 235, 1)',
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ststsCounter = (cards, profil) => {
  let stats = {
    cardsCount: {SSS: 0, SS: 0, S: 0, A: 0, B: 0, C: 0, D: 0, E: 0, total: 0},
    cardsCountProfile: {SSS: 0, SS: 0, S: 0, A: 0, B: 0, C: 0, D: 0, E: 0, total: 0, max: 0},
    cardsDereCount: {
      yato: 0,
      yami: 0,
      raito: 0,
      tsundere: 0,
      mayadere: 0,
      kamidere: 0,
      deredere: 0,
      bodere: 0,
      kuudere: 0,
      dandere: 0,
      yandere: 0},
    cardsAffectionCount: {
      zaciekawienie: 0,
      fascynacja: 0,
      przyjazn: 0,
      zauroczenie: 0,
      milosc: 0,
      obsesyjnaMilosc: 0,
      obsesyjnaMiloscA: 0,
      obsesyjnaMiloscB: 0,
      obsesyjnaMiloscY: 0,
      obojetnosc: 0,
      chlodnosc: 0,
      zlosliwosc: 0,
      wrogosc: 0,
      zawisc: 0,
      nienawisc: 0,
      pogarda: 0,
      pogardaA: 0,
      pogardaB: 0,
      pogardaY: 0},
    cardsTagCount: {trade: 0, favorite: 0, reservation: 0, gallery: 0},
    restartsCount: 0,
    ultimate: 0,
    unique: 0,
    customImage: 0,
    customBorder: 0,
    inCage: 0,
    blocked: 0,
    value: {high: 0, normal: 0, low: 0},
    onExpedition: {profile: 0, page: 0},
    activeCards: {total: 0, cards: []},
  }

  stats.cardsCountProfile = profil.cardsCount;
  stats.cardsCount.total = cards.length;
  stats.onExpedition.profile = profil.expeditions.length;

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    // cards count
    switch (card.rarity) {
      case "sss":
        stats.cardsCount.SSS += 1;
        break;
      case "ss":
        stats.cardsCount.SS += 1;
        break;
      case "s":
        stats.cardsCount.S += 1;
        break;
      case "a":
        stats.cardsCount.A += 1;
        break;
      case "b":
        stats.cardsCount.B += 1;
        break;
      case "c":
        stats.cardsCount.C += 1;
        break;
      case "d":
        stats.cardsCount.D += 1;
        break;
      case "e":
        stats.cardsCount.E += 1;
        break;
      default:
        break;
    }

    // cards dere count
    switch (card.dere) {
      case "yato":
        stats.cardsDereCount.yato += 1;
        break;
      case "yami":
        stats.cardsDereCount.yami += 1;
        break;
      case "raito":
        stats.cardsDereCount.raito += 1;
        break;
      case "tsundere":
        stats.cardsDereCount.tsundere += 1;
        break;
      case "mayadere":
        stats.cardsDereCount.mayadere += 1;
        break;
      case "kamidere":
        stats.cardsDereCount.kamidere += 1;
        break;
      case "deredere":
        stats.cardsDereCount.deredere += 1;
        break;
      case "bodere":
        stats.cardsDereCount.bodere += 1;
        break;
      case "kuudere":
        stats.cardsDereCount.kuudere += 1;
        break;
      case "dandere":
        stats.cardsDereCount.dandere += 1;
        break;
      case "yandere":
        stats.cardsDereCount.yandere += 1;
        break;
      default:
        break;
    }

    // cards affection count
    switch (card.affection) {
      case "Zaciekawienie":
        stats.cardsAffectionCount.zaciekawienie += 1;
        break;
      case "Fascynacja":
        stats.cardsAffectionCount.fascynacja += 1;
        break;
      case "Przyjaźń":
        stats.cardsAffectionCount.przyjazn += 1;
        break;
      case "Zauroczenie":
        stats.cardsAffectionCount.zauroczenie += 1;
        break;
      case "Miłość":
        stats.cardsAffectionCount.milosc += 1;
        break;
      case "Obsesyjna miłość":
        stats.cardsAffectionCount.obsesyjnaMilosc += 1;
        break;
      case "Obsesyjna miłość (α)":
        stats.cardsAffectionCount.obsesyjnaMiloscA += 1;
        break;
      case "Obsesyjna miłość (β)":
        stats.cardsAffectionCount.obsesyjnaMiloscB += 1;
        break;
      case "Obsesyjna miłość (γ)":
        stats.cardsAffectionCount.obsesyjnaMiloscY += 1;
        break;
      case "Obojętność":
        stats.cardsAffectionCount.obojetnosc += 1;
        break;
      case "Chłodność":
        stats.cardsAffectionCount.chlodnosc -= 1;
        break;
      case "Złośliwość":
        stats.cardsAffectionCount.zlosliwosc -= 1;
        break;
      case "Wrogość":
        stats.cardsAffectionCount.wrogosc -= 1;
        break;
      case "Zawiść":
        stats.cardsAffectionCount.zawisc -= 1;
        break;
      case "Nienawiść":
        stats.cardsAffectionCount.nienawisc -= 1;
        break;
      case "Pogarda":
        stats.cardsAffectionCount.pogarda -= 1;
        break;
      case "Pogarda (α)":
        stats.cardsAffectionCount.pogardaA -= 1;
        break;
      case "Pogarda (β)":
        stats.cardsAffectionCount.pogardaB -= 1;
        break;
      case "Pogarda (γ)":
        stats.cardsAffectionCount.pogardaY -= 1;
        break;
      default:
        break;
    }

    // cards affection count
    if (card.tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1) stats.cardsTagCount.trade += 1;
    if (card.tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1) stats.cardsTagCount.favorite += 1;
    if (card.tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1) stats.cardsTagCount.reservation += 1;
    if (card.tags.map((e)=> e.toLowerCase()).indexOf("galeria") > -1) stats.cardsTagCount.gallery += 1;

    // restarts
    stats.restartsCount += card.restartCnt;
    // ultimate
    if (card.isUltimate) stats.ultimate += 1;
    // unique
    if (card.isUnique) stats.unique += 1;
    // custom image
    if (card.hasCustomImage) stats.customImage += 1;
    // custom border
    if (card.hasCustomBorder) stats.customBorder += 1;
    // in cage
    if (card.isInCage) stats.inCage += 1;
    // tradable -> false = yes // true = no
    if (!card.isTradable) stats.blocked += 1;
    // on expedition (max 10 cards)
    if (card.isOnExpedition) stats.onExpedition.page += 1;

    // card value
    switch (card.value) {
      case "normal":
        stats.value.normal += 1;
        break;
      case "high":
        stats.value.high += 1;
        break;
      case "low":
        stats.value.low += 1;
        break;
      default:
        break;
    }

    // active cards
    if (card.isActive) {
      stats.activeCards.total += 1;
      stats.activeCards.cards.push(card);
    }

  }

  console.log(stats);

  return stats
}



const CardStats = (props) => {
    const {
        openCardStats,
        handleCloseCardStats,
        cardsData,
        profileData,
    } = props;

    const classes = useStyles();

    const statistics = ststsCounter(cardsData, profileData);
    ValueChartData.datasets[0].data = [statistics.value.high,statistics.value.normal,statistics.value.low];

    AffectionChartData.datasets[0].data = [statistics.cardsAffectionCount.zaciekawienie,statistics.cardsAffectionCount.fascynacja,statistics.cardsAffectionCount.przyjazn,statistics.cardsAffectionCount.zauroczenie,statistics.cardsAffectionCount.milosc,statistics.cardsAffectionCount.obsesyjnaMilosc,statistics.cardsAffectionCount.obsesyjnaMiloscA,statistics.cardsAffectionCount.obsesyjnaMiloscB,statistics.cardsAffectionCount.obsesyjnaMiloscY];

    AffectionChartData.datasets[1].data = [statistics.cardsAffectionCount.chlodnosc,statistics.cardsAffectionCount.zlosliwosc,statistics.cardsAffectionCount.wrogosc,statistics.cardsAffectionCount.zawisc,statistics.cardsAffectionCount.nienawisc,statistics.cardsAffectionCount.pogarda,statistics.cardsAffectionCount.pogardaA,statistics.cardsAffectionCount.pogardaB,statistics.cardsAffectionCount.pogardaY];

    DereChartData.datasets[0].data = [statistics.cardsDereCount.yato,statistics.cardsDereCount.yami, statistics.cardsDereCount.raito, statistics.cardsDereCount.tsundere, statistics.cardsDereCount.mayadere,statistics.cardsDereCount.kamidere,statistics.cardsDereCount.deredere,statistics.cardsDereCount.bodere,statistics.cardsDereCount.kuudere,statistics.cardsDereCount.dandere,statistics.cardsDereCount.yandere];

    TagChartData.datasets[0].data = [statistics.cardsTagCount.trade,statistics.cardsTagCount.favorite,statistics.cardsTagCount.gallery,statistics.cardsTagCount.reservation];

    RarityChartData.datasets[0].data = [statistics.cardsCount.SSS,statistics.cardsCount.SS,statistics.cardsCount.S,statistics.cardsCount.A,statistics.cardsCount.B,statistics.cardsCount.C,statistics.cardsCount.D,statistics.cardsCount.E];

    RarityChartData.datasets[1].data = [statistics.cardsCountProfile.SSS,statistics.cardsCountProfile.SS,statistics.cardsCountProfile.S,statistics.cardsCountProfile.A,statistics.cardsCountProfile.B,statistics.cardsCountProfile.C,statistics.cardsCountProfile.D,statistics.cardsCountProfile.E];

    ImageChartData.datasets[0].data = [statistics.customImage,statistics.customBorder];

  return (
    <div>
      <Dialog
        fullScreen
        open={openCardStats}
        onClose={handleCloseCardStats}
        TransitionComponent={Transition}
        className={classes.dialogContainer}
      >
        <AppBar sx={{ position: 'relative' }} className={classes.AppBar} >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseCardStats}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Statystyki
            </Typography>
          </Toolbar>
        </AppBar>

          <Grid container>
            <Grid item sm={12} xs={12} className={classes.gridI}>
              <div style={{height: "48px"}}></div>
            </Grid>

            <Grid item sm={12} xs={12} className={classes.gridITop}>
                  <Grid container>
                    <Grid item sm={6} xs={12} md={3} className={classes.gridI}>
                            <div className={classes.highlight}>
                          <div className={classes.circle}>
                              <LockIcon style={{placeSelf: "center"}} />
                          </div>
                          <div className={classes.wrap}>
                            <div className={classes.value}>{statistics.inCage}</div>
                            <div className={classes.label}>Klatka</div>
                          </div>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={3} className={classes.gridI}>
                            <div className={classes.highlight}>
                          <div className={classes.circle}>
                              <BlockIcon style={{placeSelf: "center"}} />
                          </div>
                          <div className={classes.wrap}>
                            <div className={classes.value}>{statistics.blocked}</div>
                            <div className={classes.label}>Zablokowane</div>
                          </div>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={3} className={classes.gridI}>
                            <div className={classes.highlight}>
                          <div className={classes.circle}>
                              <MilitaryTechIcon style={{placeSelf: "center"}} />
                          </div>
                          <div className={classes.wrap}>
                            <div className={classes.value}>{statistics.ultimate}</div>
                            <div className={classes.label}>Ultimate</div>
                          </div>
                        </div>
                    </Grid>
                    <Grid item sm={6} xs={12} md={3} className={classes.gridI}>
                            <div className={classes.highlight}>
                          <div className={classes.circle}>
                              <RestartAltIcon style={{placeSelf: "center"}} />
                          </div>
                          <div className={classes.wrap}>
                            <div className={classes.value}>{statistics.restartsCount}</div>
                            <div className={classes.label}>Restartów</div>
                          </div>
                        </div>
                    </Grid>
                 </Grid>
            </Grid>

            <Grid item sm={12} md={12} lg={6} xs={12} className={classes.gridI}>
              <RarityChart />
            </Grid>
            <Grid item sm={12} md={12} lg={6} xs={12} className={classes.gridI}>
              <AffectionChart />
            </Grid>
            <Grid item sm={6} md={6} lg={3} xs={12} className={classes.gridI}>
              <ValueChart />
            </Grid>
            <Grid item sm={6} md={6} lg={3} xs={12} className={classes.gridI}>
              <DereChart />
            </Grid>
            <Grid item sm={6} md={6} lg={3} xs={12} className={classes.gridI}>
              <TagChart />
            </Grid>
            <Grid item sm={6} md={6} lg={3} xs={12} className={classes.gridI}>
              <ImageChart />
            </Grid>
          </Grid>
      </Dialog>
    </div>
  );
}

export default CardStats;