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
  TableSortLabel
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import Footer from "./Module/Footer";

import axios from "axios";

// galery sorting function
import sortProfileGallery from './Utils/sortGallery.js';

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
  sortWL: {
    "& .MuiSvgIcon-root": {
      color: "inherit !important",
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
    const { userID } = params;

    const classes = useStyles();

    const changeUserColor = (profileColor) => {
      return profileColor ? profileColor : "#f50057"
    }

    const [status, setStatus] = useState();
    const [wlList, setWlList] = useState();
    const [profileData, setProfileData] = useState();
    // sorting properties
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const [nick, setNick] = useState();

    useEffect(() => {
      let lUsername = JSON.parse(localStorage.getItem(`u${userID}username`))
      if (lUsername !== null && parseInt(lUsername.reqTime,10)+72000000 > new Date().getTime()) {
        setNick(lUsername.name)
      } else if(nick===undefined) {
        axios.get(`https://api.sanakan.pl/api/user/shinden/${userID}/username`).then((res) => {
          const newNick = res.data
          setNick(newNick)
          localStorage.setItem(`u${userID}username`, JSON.stringify({name: newNick, reqTime: new Date().getTime()}));
        }).catch((error) => {

          const lastVisited = JSON.parse(localStorage.getItem(`lastVisited`))

          if (lastVisited !== null) {
            lastVisited.forEach(element => {
              if (element !== null) {
                if (element.id == userID) {
                  setNick(element.name)
                }
              }
            });
          }

        })
      }
    }, []);

    useEffect(async () => {
      let lProfile = JSON.parse(localStorage.getItem(`u${userID}profile`))
        if (lProfile !== null && parseInt(lProfile.reqTime,10)+600000 > new Date().getTime()) {
          setProfileData(lProfile.profil)
        } else if(profileData===undefined) {
          await axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
            const newProfileData = res.data;
            const newProfileGallery = sortProfileGallery(newProfileData.gallery, newProfileData.galleryOrder)
            setProfileData({...newProfileData, gallery: newProfileGallery});
            localStorage.setItem(`u${userID}profile`, JSON.stringify({profil: {...newProfileData, gallery: newProfileGallery}, reqTime: new Date().getTime()}));
          }).catch((error)=>{
            setStatus(404)
          })
      }
    }, []);

      useEffect(()=> {
          axios.get(`https://api.sanakan.pl/api/waifu/user/shinden/${userID}/wishlist/raw`).then((res)=> {
              const newWlList = res.data;
              if(res.data.length) {
                  setWlList(newWlList);
                  setStatus(res.status);
              } else {
                  setWlList(newWlList);
                  setStatus(-1);
              }
          }).catch((err)=>{
              setStatus(err.response.status);
          })
      }, [])

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

    const handleSortRequest = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);

      const sortedData = wlList.sort((a, b) => {
        if (!isAsc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      });

      setWlList(sortedData);
    };
    

    return (
      <>
        <Paper className={classes.root} style={backgroundImg(profileData)}>
            <div className={classes.foreground} style={foregroundImg(profileData)}></div>
            <Toolbar props={props} pageValue={2} profileData={profileData} />
          <div className={classes.shadow} ></div>
        </Paper>

          <Grid container justify="center" spacing={2} className={classes.mainPage}>
          <Grid item md={4} xs={12} className={classes.profile} container>
                <Grid item xs={12}>
                  <Grid container justify="center" alignItems="center" className={classes.profile_container}>
                    <Grid item xl={5} lg={6} md={7} sm={4} xs={5} className={classes.profile_item}>
                      <Avatar src={userID==1 ? `https://sanakan.pl/sanakan.jpg` : `https://cdn.shinden.eu/cdn1/avatars/225x350/${userID}.jpg?`} alt="avatar.jpg" className={classes.profile_item_avatar}
                      style={profileData ? profileData.foregroundColor ? {background: `linear-gradient(to bottom, ${profileData.foregroundColor}, ${hexToRgbA(profileData.foregroundColor,0.50)})`,} : {}  : {}} />
                    </Grid>
                    <Grid item xl={7} lg={6} md={5} sm={8} xs={7} className={classes.profile_item}>
                      <Typography variant="h5" display="block" className={classes.profile_item_name} noWrap style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}}>{userID==1 ? "Sanakan" : nick===undefined ? "????" : nick}</Typography>
                      <Typography variant="h7" className={classes.profile_item_rank} noWrap style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), opacity: 0.80}}>{userID==1 ? "Safeguard" : profileData ? profileData.userTitle : "???"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
          </Grid>
          <Grid item md={8} xs={12} container></Grid>
          <Grid item xs={12} className={classes.wishlist_table_container} container>
          {status===200 ? (
            <>
            <div className={classes.wishlist_title}>Lista życzeń</div>
            <TableContainer>
              <Table className={classes.wishlist_table} aria-label="simple table">
                <TableHead className={classes.wishlist_table_head}>
                  <TableRow >
                    <TableCell className={classes.wishlist_table_th} style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >
                      <TableSortLabel
                        active={orderBy === 'objectName'}
                        direction={orderBy === 'objectName' ? order : 'asc'}
                        onClick={() => handleSortRequest('objectName')}
                        style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}}
                        className={classes.sortWL}
                      >
                        Nazwa 
                      </TableSortLabel>
                      </TableCell>
                    <TableCell className={classes.wishlist_table_th} align="right" style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >
                      <TableSortLabel
                        active={orderBy === 'type'}
                        direction={orderBy === 'type' ? order : 'asc'}
                        onClick={() => handleSortRequest('type')}
                        style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}}
                        className={classes.sortWL}
                      >
                        Typ
                      </TableSortLabel>
                      </TableCell>
                    <TableCell className={classes.wishlist_table_th} align="right" style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined), borderColor: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >
                      <TableSortLabel
                        active={orderBy === 'objectId'}
                        direction={orderBy === 'objectId' ? order : 'asc'}
                        onClick={() => handleSortRequest('objectId')}
                        style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}}
                        className={classes.sortWL}
                      >
                        ID
                      </TableSortLabel>
                      </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wlList.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2} component="th" scope="row">
                          {name(row.type, row.objectName, row.objectId, classes, profileData ? profileData.foregroundColor : undefined)}
                      </TableCell>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2}  align="right">{type(row.type)}</TableCell>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2}  align="right">{row.objectId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
            ) : (
                status===401 ? <p className={classes.error404}><span style={{color: changeUserColor(profileData ? profileData.foregroundColor : undefined)}} >401</span><br />Lista życzeń jest prywatna.</p> :
                status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
                status===-1 ? <p className={classes.error404}><span>Error</span><br />Nie odnaleziono listy życzeń użytkownika.</p> :
                <CircularProgress className={classes.CircularProgress} size={100}/>
            )}
          </Grid>
          </Grid>
        <Footer />
    </>
    )
}

export default Wishlist;