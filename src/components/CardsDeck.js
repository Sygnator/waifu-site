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
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import Footer from "./Module/Footer";

import MuiAlert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';

// import CheckIcon from '@material-ui/icons/Check';
// import CloseIcon from '@material-ui/icons/Close';

import axios from "axios";
import LazyCardMedia from "./Module/LazyCardMedia.js";
// import testProf from "./TestData/testProf.js";
// import testCards from "./TestData/testCard.js";

import CardDetails from "./Card/CardDetails.js";
import CardIcons from "./Card/CardIcons.js";
import { NonceProvider } from 'react-select';
import emoji from "./emoji.js";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

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
  card_small_item: {
    backgroundColor: "#2c2f35",
    maxWidth: 150,
    minWidth: 150,
    maxHeight: 250,
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
  card_small_img: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 130,

    [theme.breakpoints.between('xs', 'xs')]: {
      width: 320,
      marginTop: 10,
    },
  },
  card_name: {
    color: "#f50057",
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
          "& div": {
            color: "#c1c1c1",
          },
          "& .Mui-selected": {
            backgroundColor: "#c1c1c133",
            color: "#c1c1c1",
          },
          "& button:hover": {
            backgroundColor: "#c1c1c111",
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
    boxShadow: "0px 0px 100px 0px rgba(0,0,0,0.08)",
  },
  excludeTags: {
    backgroundColor: "#c6282855",
    border: "1px solid #b71c1c55",
    color: "#c1c1c1",
    marginRight: 5,
    marginBottom: 5,
    boxShadow: "0px 0px 100px 0px rgba(0,0,0,0.08)",
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
  errorCliskSpan: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: 32,
    color: "#c1c1c1",

    "& span": {
      color: "#ab003c",
    },
    "& span:hover": {
      textDecoration: "underline"
    }
  },

  table_container: {
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
  // table: {
  //   // border: "1px solid #424242",
  //     color: "#c1c1c1",
  // },
  table_head: {
    backgroundColor: "#232427",
  },
  table_th: {
    textAlign: "center",
    borderBottom: "2px solid #ab003ce8",
    color: "#f50057",
  },
  table_image: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "20%",
    height: "20%",

    [theme.breakpoints.down('lg')]: {
      width: "30%",
      height: "30%",
    },

    [theme.breakpoints.down('md')]: {
      width: "40%",
      height: "40%",
    },

    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  table_body: {
    "& tr:hover": {
      cursor: "pointer",
      opacity: 0.7,
      height: "102%",
    },
  },
  table_td1: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#323438",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  table_td2: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#2b2d31",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  table_name: {
    textDecoration: "none",
    color: "#c1c1c1",

    "&:hover": {
      color: "#f50057",
    }
  },
}));

const CardsDeck = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { userID, cardID } = params;

    const classes = useStyles();

    const [pageVersion, setPageVersion] = useState("cards");
    const [profileData, setProfileData] = useState();
    const [cardsData, setCardsData] = useState();

    const [openDetails, setOpenDetails] = React.useState(false);
    const [detailsIndex, setDetailsIndex] = React.useState(-1);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [cardsOnPage, setCardsOnPage] = useState(1);

    const [status, setStatus] = useState();

    const [localFilter, setLocalFilter] = useState(JSON.parse(localStorage.getItem(`u${userID}filter`)));
    const localCardsOnPage = JSON.parse(localStorage.getItem(`cardsOnPage`));
    const localCardsStyle = JSON.parse(localStorage.getItem(`cardsStyle`));

    const emptyFilter = {
      orderBy: "id",
      includeTags: [],
      excludeTags: [],
      searchText: null,
      filterTagsMethod: 0,
    };

    const [nick, setNick] = useState();

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

    const filterUpdate = (filterData) => {
      localStorage.setItem(`u${userID}filter`, JSON.stringify(filterData))
      setLocalFilter(filterData)
      return JSON.parse(localStorage.getItem(`u${userID}filter`));
    };

    useEffect(() => {
      if(profileData!=undefined) {
          const cardsAmount = profileData.cardsCount.total;
          if(localCardsOnPage===null) {
              setCardsOnPage(cardsAmount)
          } else {
              setCardsOnPage(parseInt(localCardsOnPage))
              setPageCount(Math.ceil(cardsAmount/localCardsOnPage));
          }

          if(localCardsOnPage===null) {
            setPageVersion("cards")
          } else {
            setPageVersion(localCardsStyle)
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
                const totalCards = res.data.totalCards;
                setStatus(200);
                setCardsData(newWaifuCardsData);
                if (cardID) {
                  let indexCa = newWaifuCardsData.findIndex((c)=> c.id == cardID)
                  if (indexCa >= 0) {
                    setOpenDetails(true)
                    setDetailsIndex(indexCa)
                  }
                }
                if(totalCards<cardsOnPage) {
                    setPageCount(1);
                } else {
                    setPageCount(Math.ceil(totalCards/cardsOnPage));
                }
        }).catch((error)=>{
          console.log(error);
          setStatus(415);
        })
    }
  }, [page, cardsOnPage]);

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
                    <a className={classes.card_id}>{id}</a>: <Link className={classes.card_name} style={{color: changeUserColor(profileData.foregroundColor)}} href={characterUrl} target="_blank">{name}</Link>
                    <CardIcons
                      {...props}
                      card={waifuCard}
                    />
                    {`${animeTitle}`}
                  </CardContent>
              </Card>
          </Grid>
      )
  }

  const getWaifuSmallCard = (waifuCard, index) => {
    const { id, smallImageUrl, name, characterUrl } = waifuCard
    //console.log(tags)
    return (
        <Grid item key={id} >
            <Card className={classes.card_small_item} >
              <CardActionArea onClick={handleOpenCardDetails(index)}>
                <div className={classes.card_small_img}>
                  <LazyCardMedia image={smallImageUrl} alt={id} {...props} ></LazyCardMedia>
                </div>
              </CardActionArea>
                <CardContent className={classes.card_content}>
                  <a className={classes.card_id}>{id}</a><br /> <Link className={classes.card_name} style={{color: changeUserColor(profileData.foregroundColor)}} href={characterUrl} target="_blank">{name.split(" ")[0]}</Link>
                </CardContent>
            </Card>
        </Grid>
    )
}

  {/* TODO Add version cards */}
  const getWaifuCardList = (cardsData) => {
    return (
      <TableContainer className={classes.table_container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.table_head}>
          <TableRow >
            <TableCell className={classes.table_th} style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} ></TableCell>
            <TableCell className={classes.table_th} align="right" style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >ID</TableCell>
            <TableCell className={classes.table_th} align="right" style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >Nazwa</TableCell>
            <TableCell className={classes.table_th} align="right" style={{maxWidth: 20, color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >Statystyki</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.table_body} >
          {cardsData.map((card, index) => (
            <TableRow key={card.id} onClick={handleOpenCardDetails(index)}>
              <TableCell className={index%2===0 ? classes.table_td1 : classes.table_td2} align="center" >
                <div className={classes.table_image}>
                  <LazyCardMedia image={card.smallImageUrl} alt={card.id} {...props} />
                </div>
              </TableCell>
              <TableCell className={index%2===0 ? classes.table_td1 : classes.table_td2}  align="center">{card.id}</TableCell>
              <TableCell className={index%2===0 ? classes.table_td1 : classes.table_td2}  align="center">
                <a style={{color: changeUserColor(profileData.foregroundColor), textDecoration: "none"}}>
                  {card.name}
                </a>
                <CardIcons
                    {...props}
                    card={card}
                />
              </TableCell>
              <TableCell className={index%2===0 ? classes.table_td1 : classes.table_td2}  align="center">❤️ {card.finalHealth} ({card.baseHealth}) 🔥 {card.attack} 🛡️ {card.defence} </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }

  const pageChange = (event, value) => {
    setPage(value);
  };

  const clearData = () => {
    localStorage.removeItem(`u${userID}filter`)
    localStorage.removeItem(`u${userID}dataFilter`)
    window.location.reload()
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

  const handleOpenCardDetails = (index) => () => {
    window.location.href=`#/user/${userID}/card/${cardsData[index].id}`
    setDetailsIndex(index)
    setOpenDetails(true);
  }

  const handleCloseCardDetails = () => {
    window.location.href=`#/user/${userID}/cards`
    setOpenDetails(false);
  }

  const handleIndexUp = () => {
    if (detailsIndex+1 != cardsData.length+1) {
      window.location.href=`#/user/${userID}/card/${cardsData[detailsIndex+1].id}`
    }
    setDetailsIndex(detailsIndex+1);
  }

  const handleIndexDown = () => {
    if (detailsIndex-1 != -1) {
      window.location.href=`#/user/${userID}/card/${cardsData[detailsIndex-1].id}`
    }
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
    {backgroundImage: `url(${profil.backgroundImageUrl})`, backgroundPosition: `50% ${profil.backgroundPosition ? profil.backgroundPosition : 35}%`,}
  }

  const foregroundImg = (profil) => {
    return (profil===undefined||profil.foregroundImageUrl===null) ?  {} :
    {
      backgroundImage: `url(${profil.foregroundImageUrl})`,
      backgroundPosition: `${profil.foregroundPosition ? profil.foregroundPosition : 0}% top`,
    }
  }

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

    return (
      <>
        <Paper className={classes.root} style={backgroundImg(profileData)}>
            <div className={classes.foreground} style={foregroundImg(profileData)}></div>
            <Toolbar props={props} pageValue={1} showFilter={status===200 ? true : false} profileData={profileData} cardsData={cardsData} />

          <div className={classes.shadow} ></div>
        </Paper>



          <Grid container justify="center" spacing={2} className={classes.mainPage}>
          <Grid item md={4} xs={12} className={classes.profile} container>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="center" className={classes.profile_container}>
                    <Grid item xl={5} lg={6} md={7} sm={4} xs={5} className={classes.profile_item}>
                      <Avatar src={userID==1 ? `https://sanakan.pl/sanakan.jpg` :  `https://cdn.shinden.eu/cdn1/avatars/225x350/${userID}.jpg`} alt="avatar.jpg" className={classes.profile_item_avatar} style={profileData ? profileData.foregroundColor ? {background: `linear-gradient(to bottom, ${profileData.foregroundColor}, ${hexToRgbA(profileData.foregroundColor,0.50)})`,} : {}  : {}} />
                    </Grid>
                    <Grid item xl={7} lg={6} md={5} sm={8} xs={7} className={classes.profile_item}>
                      <Typography variant="h5" display="block" className={classes.profile_item_name} noWrap style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}}>{userID==1 ? "Sanakan" : nick===undefined ? "????" : nick}</Typography>
                      <Typography variant="h7" className={classes.profile_item_rank} noWrap style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), opacity: 0.80}}>{userID==1 ? "Safeguard" : profileData ? profileData.userTitle : "???"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
          </Grid>
          <Grid item md={8} xs={12} container>
            {cardsData&&profileData ? (
              <>
                <div className={classes.chip_container}>
                  {localFilter.includeTags.map((tag)=>{
                    // console.log(emoji(tag))
                    return (<Chip className={classes.includeTags} clickable={false} label={emoji(tag)=='️' || ""? "Zepsuty Tag" :
                    emoji(tag)=="" ? "Zepsuty Tag" : emoji(tag)}/>) /* onDelete={handleChipDeleteInclude(tag)} />) */
                  })}{/* icon={<CheckIcon className={classes.tag_icon} />} */}
                  {localFilter.excludeTags.map((tag)=>{
                    return (<Chip className={classes.excludeTags} clickable={false} label={emoji(tag)=='️' || "" ? "Zepsuty Tag" :
                    emoji(tag)=="" ? "Zepsuty Tag" : emoji(tag)}/>) /* onDelete={handleChipDeleteExclude(tag)} />) */
                  })}{/* icon={<CloseIcon className={classes.tag_icon} />} */}
                </div>
            </>
            ) : ""}
          </Grid>
            {cardsData&&profileData ? (
              <>
                <Grid item xs={12} justify="center" spacing={1} className={classes.cards_container} container>
                  {cardsData.length===0 ? <p className={classes.error404}>Nie znaleziono kart.<p className={classes.errorCliskSpan}>Prawdopodobnie jest to spowodowane przez tagi które oznaczyłeś, aby je zrestasować kliknij <span onClick={()=>clearData()}>tutaj</span>.</p></p>
                   : (
                  <>
                    {pageVersion==="list" ? getWaifuCardList(cardsData) : pageVersion==="small" ? cardsData.map((card, index)=>getWaifuSmallCard(card, index)) : cardsData.map((card, index)=>getWaifuCard(card, index))}
                    {pageCount>1 ? renderPagination(page, pageCount) : ""}
                  </>
                  )}
                </Grid>
                <CardDetails
                  {...props}
                  index={detailsIndex}
                  cardsData={cardsData}
                  openDetails={openDetails}
                  userColor={profileData.foregroundColor}
                  handleIndexUp={handleIndexUp}
                  handleIndexDown={handleIndexDown}
                  handleCloseCardDetails={handleCloseCardDetails}
                />
              </>
            ) : (
              status===-1 ? <p className={classes.error404}><span>Error</span><br />Nieobsługiwany błąd strony.</p> :
              status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
              status===415 ? <p className={classes.error404}><span>415</span><br />Nie pobrano kart użytkownika. <br /> Spróbuj odświeżyć stronę lub zgłoś błąd na discord.</p> :
              <CircularProgress className={classes.CircularProgress} style={profileData ? {color: changeUserColor(profileData ? profileData.foregroundColor : undefined)} : {}} size={100}/>
            )}
          </Grid>
        <Footer />
    </>
    )
}

export default CardsDeck;