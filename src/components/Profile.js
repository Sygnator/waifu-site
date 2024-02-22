import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Grid,
  CardMedia,
  CircularProgress,
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
  TableSortLabel,
  Tooltip,
  Snackbar,
  CardActionArea,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import Footer from "./Module/Footer";

import MuiAlert from '@material-ui/lab/Alert';

import LazyCardMedia from "./Module/LazyCardMedia.js";
// import testProf from "./TestData/testProf.js";
import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

// import { CenterFocusStrong } from '@material-ui/icons';
import CardDetails from "./Card/CardDetails.js";

// galery sorting function
import sortProfileGallery from './Utils/sortGallery.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#30333a",
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0),
    color: "#fff",
  },

  profile_container: {
    margin: 0,
    padding: 0,
  },
  profile_item: {
    position: "relative",
    minHeight: 70,

    [theme.breakpoints.between('md', 'md')]: {
      bottom: 80,
      textAlign: "center",
    },

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
    // background: "linear-gradient(to bottom right, #20232a, #30333a)",
    // border: "2px solid #20232a",

    "& .MuiAvatar-img": {
      borderRadius: "50%",
    },

    [theme.breakpoints.between('md', 'md')]: {
      position: "relative",
      marginRight: "auto",
      marginLeft: "auto",
    },

  },
  profile_item_name: {
    color: "#f50057",
    marginTop: 5,
    marginLeft: 10,

    [theme.breakpoints.between('md', 'md')]: {
      marginLeft: 0,
    },
  },
  profile_item_rank: {
    color: "#ab003c",
    marginLeft: 10,

    [theme.breakpoints.between('md', 'md')]: {
      marginLeft: 0,
    },
  },

  exchangeConditions_container: {
    margin: 15,
    maxHeight: 620,
    textAlign: "center",
    overflow: "hidden",
  },
  exchangeConditions_title: {
    color: "#fff",
  },
  exchangeConditions_content: {
    color: "#c1c1c1",
    fontSize: 18,

    "& a": {
      color: "#f50057",
    },
    "& p": {
      marginTop: "10px",
      marginBottom: "0px",
    },
    "& img": {
      maxWidth: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    "& ul, ol": {
      textAlign: "left",
    },
  },
  waifu: {
    // boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.20)",
    marginRight: "auto",
    marginLeft: "auto",
    padding: 10,
    width: 350,

    [theme.breakpoints.down('xs')]: {
      width: "90%",
      height: "90%",
    },
  },
  waifu_border: {
    padding: 30,
  },
  waifu_name: {
    textAlign: "center",
    textDecoration: "none",
  },
  waifu_name_link: {
    color: "#f50057",
  },
  rarity_container: {
    // boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.05)",
    borderRadius: "4px",
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "space-around",
    padding: "10px",
  },
  rarity_item: {
    color: "#000",
    padding: "8px 19px",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 4,
    marginBottom: 8,
  },
  rarity_item_content: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  rarity_total_max: {
    display: "grid",
    gridAutoFlow: "column",
    width: "94%",
    fontSize: 28,
    // padding: "0px 20px",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    // borderRadius: 4,
    marginBottom: 8,
    color: "#c1c1c1",
  },
  rarity_total: {
    borderTopLeftRadius: 4,
    // border: "1px solid #000",
    // borderRight: "0px solid #000",
    // borderBottom: "0px solid #000",
    backgroundColor: "#34363b",
    clipPath: "polygon(0% 0%,100% 0%, 100% 5%, 95% 100%, 0% 100%)",
    WebkitClipPath: "polygon(0% 0%,100% 0%, 100% 5%, 95% 100%, 0% 100%)",
    marginRight: "-10px",
    paddingRight: "10px",
  },
  rarity_max: {
    borderTopRightRadius: 4,
    // border: "1px solid #000",
    // borderLeft: "0px solid #000",
    // borderBottom: "0px solid #000",
    backgroundColor: "#2f3034",
    clipPath: "polygon(5% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
    WebkitClipPath: "polygon(5% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%)",
    marginLeft: "-10px",
    paddingLeft: "10px",
  },
  rarity_bar_container: {
    marginLeft: "auto",
    marginRight: "auto",
    // display: "grid",
    // gridAutoFlow: "column",
    // border: "1px solid #000",
    // borderTop: "0px solid #000",
    borderRadius: 4,
    width: "94%",
    marginTop: -13,
  },
  rarity_bar: {
    display: "inline-block",
    height: 10,
  },
  rarity_content: {
    fontSize: 16,
    color: "#c1c1c1",
    marginBottom: "4px",
  },
  SSS_count: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    background: "-webkit-linear-gradient(90deg, rgba(158,58,180,1) 0%, rgba(29,253,179,1) 50%, rgba(252,238,69,1) 100%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  gallery: {
    justifyContent: "center",
  },
  gallery_card: {
    boxShadow: "0px 0px 25px 0px rgba(0,0,0,0.15)",
    padding: 8,
    margin: 8,
    width: 180,
  },
  expeditions_title: {
    // paddingTop: 15,
    // paddingLeft: 15,
    // color: "#c1c1c1",
    display: "grid",
    gridAutoFlow: "column",
    width: "94%",
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
    // fontWeight: "bold",
    paddingTop: 5,
    color: "#c1c1c1",
  },
  expeditions_card_name: {
    textDecoration: "none",
    color: "#c1c1c1",

    "&:hover": {
      color: "#f50057",
      cursor: "pointer",
    }
  },
  expeditions_table_container: {
    padding: 15,
    paddingTop: 5,
    // hidden table scroll
    overflow: "hidden",
  },
  // expeditions_table: {
  //   border: "1px solid #424242",
  // },
  expeditions_table_head: {
    backgroundColor: "#232427",
  },
  expeditions_table_th: {
    borderBottom: "2px solid #ab003ce8",
    color: "#f50057",
  },
  expeditions_table_td1: {
    color: "#c1c1c1",
    backgroundColor: "#323438",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  expeditions_table_td2: {
    color: "#c1c1c1",
    backgroundColor: "#2b2d31",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  CircularProgress: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ab003c",
  },
  wallet_container: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    display: "grid",
    gridAutoFlow: "column",
    fontSize: 18,
  },
  wallet_item: {
    color: "#c1c1c1",
    textAlign: "center",

    "& span": {
      color: "#f50057",
    }
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
  sortExpeditions: {
    "& .MuiSvgIcon-root": {
      color: "inherit !important",
    }
  },
}));

const Profile = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [profilData, setProfilData] = useState();
    const [status, setStatus] = useState();

    // sorting properties
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const [nick, setNick] = useState();

    const [userData, setUserData] = useState();

    const changeUserColor = (profileColor) => {
      return profileColor ? profileColor : "#f50057"
    }

    useEffect(() => {
      axios.get(`https://api.sanakan.pl/api/user/shinden/${userID}/username`).then((res)=> {
          const newNick = res.data
          setNick(newNick)
        }).catch((error)=>{

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

        })
    }, []);

    const calculateBarWidth = (max, current) => {
      return `${(((90.4/max)*current) + 1.2)}%`;
    }

    function timeDiffCalc(dateFuture, dateNow, maxTime, profileColor) {
      let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
      const min = diffInMilliSeconds/60

      // calculate days
      const days = Math.floor(diffInMilliSeconds / 86400);
      diffInMilliSeconds -= days * 86400;

      // calculate hours
      const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
      diffInMilliSeconds -= hours * 3600;

      // calculate minutes
      const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
      diffInMilliSeconds -= minutes * 60;

      let difference = '';
      if (days > 0) {
        difference += (days === 1) ? `${days}d ` : `${days}d `;
      }

      difference += (hours === 0 || hours === 1) ? `${hours}h ` : `${hours}h `;

      difference += (minutes === 0 || hours === 1) ? `${minutes}m` : `${minutes}m`;

      if (min>maxTime) {
        return (
          <span style={{color: changeUserColor(profileColor ? profileColor : undefined)}}>
            {difference}
          </span>
        );
      } else {
        return difference;
      }
    }

    const copyExpeditionCmdToClipboard = (cardId) => () => {
      navigator.clipboard.writeText("s.wyprawa koniec " + cardId);
      setOpenSnackbarSuccess(true);
    }

    useEffect(()=> {
        let lProfile = JSON.parse(localStorage.getItem(`u${userID}profile`))
        if (lProfile !== null && parseInt(lProfile.reqTime,10)+600000 > new Date().getTime()) {
          setProfilData(lProfile.profil)
        } else {
          setProfilData();
          setStatus();
          axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
              const newProfileData = res.data;
              const newProfileGallery = sortProfileGallery(newProfileData.gallery, newProfileData.galleryOrder)
              setProfilData({...newProfileData, gallery: newProfileGallery});
              localStorage.setItem(`u${userID}profile`, JSON.stringify({profil: {...newProfileData, gallery: newProfileGallery},reqTime: new Date().getTime()}));
          }).catch((error)=>{
            setStatus(404)
          })
        }
    }, [userID])


    const nickUpdate = () => {
      setNick("????")
      return "????"
    }

    const backgroundImg = (profil) => {
      return (profil===undefined||profil.backgroundImageUrl===null) ?  {backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,} :
      {backgroundImage: `url(${profil.backgroundImageUrl})`, backgroundPosition: `50% ${profil.backgroundPosition ? profil.backgroundPosition : 35}%`,}
    }

    const foregroundImg = (profil) => {
      return (profil===undefined||profil.foregroundImageUrl===null) ?  {} :
      {
        backgroundImage: `url(${profil.foregroundImageUrl})`,
        backgroundPosition: `${profil.foregroundPosition ? profil.foregroundPosition : 0}% top`,
      }
    }

    const handleCloseSnackbarSuccess = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenSnackbarSuccess(false);
    };

    function hexToRgbA(hex,o=1){
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+o+')';
      }
      throw new Error('Bad Hex');
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

  const [openDetailsExpeditions, setOpenDetailsExpeditions] = React.useState(false);
  const [detailsIndexExpeditions, setDetailsIndexExpeditions] = React.useState(-1);

  const ExpeditionsCards = [];

  const ExpeditionsCardsUpdate = (card) => {
    ExpeditionsCards.push(card);
  }

  const handleOpenCardDetailsExpeditions = (index) => () => {
    setDetailsIndexExpeditions(index)
    setOpenDetailsExpeditions(true);
  }

  const handleCloseCardDetailsExpeditions = () => {
    setOpenDetailsExpeditions(false);
  }

  const handleIndexUpExpeditions = () => {
    setDetailsIndexExpeditions(detailsIndexExpeditions+1);
  }

  const handleIndexDownExpeditions = () => {
    setDetailsIndexExpeditions(detailsIndexExpeditions-1);
  }

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    let sortedData = []
    if (property === "name" || property === "id") {
      sortedData = profilData.expeditions.sort((a, b) => {
        if (!isAsc) {
          return a["card"][property] > b["card"][property] ? 1 : -1;
        } else {
          return a["card"][property] < b["card"][property] ? 1 : -1;
        }
      });
    } else {
      sortedData = profilData.expeditions.sort((a, b) => {
        if (!isAsc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });
    }
    

    setProfilData({...profilData, expeditions: sortedData});
  };

    return (
      <>
        <Paper className={classes.root} style={backgroundImg(profilData)}>
            <div className={classes.foreground} style={foregroundImg(profilData)}></div>
            <Toolbar props={props} pageValue={0} profileData={profilData} />
          <div className={classes.shadow} ></div>
        </Paper>

        <Snackbar open={openSnackbarSuccess} autoHideDuration={2000} onClose={handleCloseSnackbarSuccess} anchorOrigin={ { vertical: 'top', horizontal: 'center' } } >
          <Alert onClose={handleCloseSnackbarSuccess} severity="success"> Skopiowano polecenie zakończenia wyprawy.</Alert>
        </Snackbar>

          <Grid container className={classes.mainPage}>
            {profilData ? (
              <>
            <Grid item md={4} xs={12} className={classes.profile} container>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="center" className={classes.profile_container}>
                    <Grid item xl={4} lg={5} md={12} sm={4} xs={5} className={classes.profile_item}>
                      <Avatar src={userID==1 ? `https://sanakan.pl/sanakan.jpg` : `https://cdn.shinden.eu/cdn1/avatars/225x350/${userID}.jpg`} alt="avatar.jpg" className={classes.profile_item_avatar} style={profilData ? profilData.foregroundColor ? {background: `linear-gradient(to bottom, ${profilData.foregroundColor}, ${hexToRgbA(profilData.foregroundColor,0.50)})`,} : {}  : {}} />
                    </Grid>
                    <Grid item xl={8} lg={7} md={12} sm={8} xs={7} className={classes.profile_item}>
                      <Typography variant="h5" display="block" className={classes.profile_item_name} noWrap style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined)}}>{userID==1 ? "Sanakan" : nick===undefined ? nickUpdate() : nick}</Typography>
                      <Typography variant="h7" className={classes.profile_item_rank} noWrap style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined), opacity: 0.80}}>{userID==1 ? "Safeguard" : profilData.userTitle ? profilData.userTitle : "???"}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.exchangeConditions_container}>
                      {profilData.exchangeConditions ? (
                          <ReactMarkdown
                            className={classes.exchangeConditions_content}
                            allowedTypes={['root', 'text', 'break', 'paragraph', 'emphasis', 'strong', 'thematicBreak', 'blockquote', 'image', 'list', 'listItem', 'heading']}
                            children={profilData.exchangeConditions.replace(/^((?!(.+|)\!\[.+\]\().+)(https?:\/\/|(www\.))?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm, "")}
                          />
                        ) : <div className={classes.exchangeConditions_content}>{"Nie ustawiono warunków wymiany."}</div>}
                    </Grid>
                  </Grid>
                </Grid>

                {/* // TODO: Add divider */}
            </Grid>

            <Grid item md={8} xs={12} container>

              <Grid item lg={6} md={12} xs={12} container>

                <Grid item xs={12}>
                  <Grid item xs={12} className={classes.waifu_border}>
                    {profilData.waifu ? (
                      <>
                        <div className={classes.waifu_name}><a href={profilData.waifu.characterUrl} className={classes.waifu_name_link} target={"_blank"} style={{color: changeUserColor(profilData.foregroundColor)}}>{profilData.waifu.name}</a></div>
                        <CardMedia component='img' image={profilData.waifu.profileImageUrl} alt={profilData.waifu.id} className={classes.waifu}></CardMedia>
                      </>
                    ) : ""}
                  </Grid>
                </Grid>
                <Grid item xs={12} container>
                  <Grid item xs={12} className={classes.rarity_bar_container}>
                    <div className={classes.rarity_total_max}>
                      <div>
                        <div className={classes.rarity_content}>Posiadane</div>
                        <div className={classes.rarity_total}>{profilData.cardsCount.total}</div>
                      </div>
                      <div>
                        <div className={classes.rarity_content}>Limit</div>
                        <div className={classes.rarity_max}>{profilData.cardsCount.max}</div>
                      </div>
                    </div>
                    <div className={classes.rarity_bar_container}>
                      <Tooltip title={`SSS - ${profilData.cardsCount.SSS}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{borderBottomLeftRadius: 4, minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.SSS), background: "linear-gradient(90deg, rgba(158,58,180,1) 0%, rgba(29,253,179,1) 50%, rgba(252,238,69,1) 100%)"}}></div>
                      </Tooltip>
                      <Tooltip title={`SS - ${profilData.cardsCount.SS}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.SS), backgroundColor: "#ff658e"}}></div>
                      </Tooltip>
                      <Tooltip title={`S - ${profilData.cardsCount.S}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.S), backgroundColor: "#ffe149"}}></div>
                      </Tooltip>
                      <Tooltip title={`A - ${profilData.cardsCount.A}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.A), backgroundColor: "#f49244"}}></div>
                      </Tooltip>
                      <Tooltip title={`B - ${profilData.cardsCount.B}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.B), backgroundColor: "#a556d8"}}></div>
                      </Tooltip>
                      <Tooltip title={`C - ${profilData.cardsCount.C}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.C), backgroundColor: "#0069ab"}}></div>
                      </Tooltip>
                      <Tooltip title={`D - ${profilData.cardsCount.D}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.D), backgroundColor: "#3e7315"}}></div>
                      </Tooltip>
                      <Tooltip title={`E - ${profilData.cardsCount.E}`} placement="top" arrow>
                        <div className={classes.rarity_bar} style={{borderBottomRightRadius: 4, minWidth: calculateBarWidth(profilData.cardsCount.total, profilData.cardsCount.E), backgroundColor: "#848484"}}></div>
                      </Tooltip>
                    </div>
                  </Grid>
                  <Grid item xs={12} className={classes.rarity_container}>
                    <div>
                      <div className={classes.rarity_item} style={{background: "linear-gradient(90deg, rgba(158,58,180,1) 0%, rgba(29,253,179,1) 50%, rgba(252,238,69,1) 100%)"}}>SSS</div>
                      <div className={classes.rarity_item_content, classes.SSS_count}>{profilData.cardsCount.SSS}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#ff658e"}}>SS</div>
                      <div className={classes.rarity_item_content} style={{color: "#ff658e"}}>{profilData.cardsCount.SS}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#ffe149"}}>S</div>
                      <div className={classes.rarity_item_content} style={{color: "#ffe149"}}>{profilData.cardsCount.S}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#f49244"}}>A</div>
                      <div className={classes.rarity_item_content} style={{color: "#f49244"}}>{profilData.cardsCount.A}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#a556d8"}}>B</div>
                      <div className={classes.rarity_item_content} style={{color: "#a556d8"}}>{profilData.cardsCount.B}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#0069ab"}}>C</div>
                      <div className={classes.rarity_item_content} style={{color: "#0069ab"}}>{profilData.cardsCount.C}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#3e7315"}}>D</div>
                      <div className={classes.rarity_item_content} style={{color: "#3e7315"}}>{profilData.cardsCount.D}</div>
                    </div>
                    <div>
                      <div className={classes.rarity_item} style={{backgroundColor: "#848484"}}>E</div>
                      <div className={classes.rarity_item_content} style={{color: "#848484"}}>{profilData.cardsCount.E}</div>
                    </div>
                  </Grid>
                </Grid>

              </Grid>

              {/* Expeditions table */}
              <Grid item lg={6} md={12} xs={12}>
                <div className={classes.expeditions_title}>
                  <div style={{textAlign: "left"}}>Wyprawy:</div>
                  <div style={{textAlign: "right"}}>{profilData.expeditions.length}/10</div>
              {/* <Typography variant="div" className={classes.expeditions_title}>Wyprawy:</Typography> */}
              {/* <Typography variant="div" className={classes.expeditions_title}>({profilData.expeditions.length}/10)</Typography> */}
              </div>
              <TableContainer className={classes.expeditions_table_container}>
                <Table className={classes.expeditions_table} size="small" aria-label="a dense table">
                  <TableHead className={classes.expeditions_table_head}>
                    <TableRow>
                      <TableCell className={classes.expeditions_table_th} align="center" style={{color: changeUserColor(profilData.foregroundColor), borderColor: changeUserColor(profilData.foregroundColor),}}>
                      <TableSortLabel
                        active={orderBy === 'id'}
                        direction={orderBy === 'id' ? order : 'asc'}
                        onClick={() => handleSortRequest('id')}
                        style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined)}}
                        className={classes.sortExpeditions}
                      >
                        ID
                      </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.expeditions_table_th} align="center" style={{color: changeUserColor(profilData.foregroundColor), borderColor: changeUserColor(profilData.foregroundColor),}}>
                        <TableSortLabel
                          active={orderBy === 'name'}
                          direction={orderBy === 'name' ? order : 'asc'}
                          onClick={() => handleSortRequest('name')}
                          style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined)}}
                          className={classes.sortExpeditions}
                        >
                          Nazwa
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.expeditions_table_th} align="center" style={{color: changeUserColor(profilData.foregroundColor), borderColor: changeUserColor(profilData.foregroundColor),}}>
                        <TableSortLabel
                          active={orderBy === 'expedition'}
                          direction={orderBy === 'expedition' ? order : 'asc'}
                          onClick={() => handleSortRequest('expedition')}
                          style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined)}}
                          className={classes.sortExpeditions}
                        >
                          Typ
                        </TableSortLabel>
                      </TableCell>
                      <TableCell className={classes.expeditions_table_th} align="center" style={{color: changeUserColor(profilData.foregroundColor), borderColor: changeUserColor(profilData.foregroundColor),}}>
                        <TableSortLabel
                          active={orderBy === 'startTime'}
                          direction={orderBy === 'startTime' ? order : 'asc'}
                          onClick={() => handleSortRequest('startTime')}
                          style={{color: changeUserColor(profilData ? profilData.foregroundColor : undefined)}}
                          className={classes.sortExpeditions}
                        >
                          Czas
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profilData.expeditions.map((card, index) => (
                      <TableRow key={card.card.id}>
                        <TableCell className={index%2===0 ? classes.expeditions_table_td1 : classes.expeditions_table_td2} style={{cursor: "copy"}} align="center" onClick={copyExpeditionCmdToClipboard(card.card.id)}>{card.card.id}</TableCell>
                        <TableCell className={index%2===0 ? classes.expeditions_table_td1 : classes.expeditions_table_td2} align="center">
                        {/* <CardActionArea > */}
                        {/* href={`${card.card.characterUrl}`} target="_blank" */}
                          <a style={profilData.foregroundColor ? {color: changeUserColor(profilData.foregroundColor), opacity: 0.90} : {}} onClick={handleOpenCardDetailsExpeditions(index)} className={classes.expeditions_card_name}>
                            {card.card.name}
                            {ExpeditionsCardsUpdate(card.card)}
                          </a>
                        {/* </CardActionArea> */}
                        </TableCell>
                        <TableCell className={index%2===0 ? classes.expeditions_table_td1 : classes.expeditions_table_td2} align="center">{card.expedition}</TableCell>
                        <TableCell className={index%2===0 ? classes.expeditions_table_td1 : classes.expeditions_table_td2} align="center">{timeDiffCalc(new Date(card.startTime), new Date(), card.maxTime, profilData ? profilData.foregroundColor : undefined)}</TableCell>
                      </TableRow>
                    ))}
                    <CardDetails
                      {...props}
                      index={detailsIndexExpeditions}
                      cardsData={ExpeditionsCards}
                      openDetails={openDetailsExpeditions}
                      userColor={profilData.foregroundColor}
                      handleIndexUp={handleIndexUpExpeditions}
                      handleIndexDown={handleIndexDownExpeditions}
                      handleCloseCardDetails={handleCloseCardDetailsExpeditions}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Expeditions table END */}

              {/* Wallet */}
              <Grid item xs={12}>
                <div className={classes.wallet_container}>
                  <div className={classes.wallet_item}>
                    <span style={{color: changeUserColor(profilData.foregroundColor)}}>PC</span>: {profilData.wallet.PC}
                  </div>
                  <div className={classes.wallet_item}>
                    <span style={{color: changeUserColor(profilData.foregroundColor)}}>CT</span>: {profilData.wallet.CT}
                  </div>
                  <div className={classes.wallet_item}>
                    <span style={{color: changeUserColor(profilData.foregroundColor)}}>TC</span>: {profilData.wallet.TC}
                  </div>
                  <div className={classes.wallet_item}>
                    <span style={{color: changeUserColor(profilData.foregroundColor)}}>SC</span>: {profilData.wallet.SC}
                  </div>
                  <div className={classes.wallet_item}>
                    <span style={{color: changeUserColor(profilData.foregroundColor)}}>AC</span>: {profilData.wallet.AC}
                  </div>
                </div>
              </Grid>
              {/* Wallet END */}

              </Grid>

            </Grid>


            <Grid item xs={12} container>

              <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} container className={classes.gallery} >
                  {profilData.gallery.map((card,index)=>{
                    return (
                      <Grid item key={card.id} >
                        <Tooltip title={`${card.id} - ${card.name}`} placement="top" arrow>
                        <CardActionArea onClick={handleOpenCardDetails(index)}>
                          <div className={classes.gallery_card} >
                            <LazyCardMedia image={card.profileImageUrl} alt={card.id}  {...props} ></LazyCardMedia>
                          </div>
                        </CardActionArea>
                        </Tooltip>
                      </Grid>
                    )
                  })}
                  <CardDetails
                  {...props}
                  index={detailsIndex}
                  cardsData={profilData.gallery}
                  openDetails={openDetails}
                  userColor={profilData.foregroundColor}
                  handleIndexUp={handleIndexUp}
                  handleIndexDown={handleIndexDown}
                  handleCloseCardDetails={handleCloseCardDetails}
                />
                </Grid>
              </Grid>
              </>
            ) : (
              status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
              <CircularProgress className={classes.CircularProgress} size={100}/>
            )}
          </Grid>
        <Footer />
    </>
    )
}

export default Profile;