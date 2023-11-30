import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
  } from "@material-ui/core";

import axios from "axios";
import { SaveRounded } from '@mui/icons-material';

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
      list: {
        paddingLeft: "10px",
        width: '100%',
        maxWidth: 500,
        color: "white",
        marginRight: "auto",
      },
      divWhite: {
          color: "white",
          fontSize: "30px",
          paddingLeft: "20px",
          paddingTop: "10px",
      },
      test: {
          textDecoration: "none",
          color: "white",
      },
      secondary: {
        "& p": {
          color: "#c1c1c1"
        }
      },
      CircularProgress: {
        marginTop: 20,
        marginBottom: 40,
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
}));



export default function ActivityList() {
    const classes = useStyles();

    const [activity, setActivity] = useState();
    const [status, setStatus] = useState(0);

    useEffect(async () => {
        let lActivity = JSON.parse(localStorage.getItem("activityList"))
        if (lActivity !== null && parseInt(lActivity.reqTime,10)+600000 > new Date().getTime()) {
            setActivity(lActivity.totalActivity)
        } else if(activity===undefined) {
            await axios.post(`https://api.sanakan.pl/api/waifu/user/activity/12`,[]).then((res)=> {
                const newActivity = res.data;
                console.log(newActivity);
            
                let totalActivity = newActivity.filter((item) => {
                      return !(item.shindenId === 0 
                        || item.type === 'wonLottery'
                        || item.type === 'Muted'
                        || item.type === 'Banned'
                        || item.type === 'Kicked'
                        || item.type === 'Connected');
                    }).map(item => {

                    let splitMisc = item.misc.split(';');
                    let subText = item.text;
                    const regex = /<(w|p|c|u|wp)@(\d+)>/gm;

                    let match;
                    while ((match = regex.exec(item.text)) !== null) {
                        if (match.index === regex.lastIndex) {
                            regex.lastIndex++;
                        }
                        subText = subText.replace(`${match[0]}`, splitMisc.find(part => part.startsWith(`${match[1]}:`)).substring(match[1].length+1))
 
                    }

                    return {...item, subText: subText, username: splitMisc.find(part => part.startsWith('u:')).substring(2)};
                }).slice(0, 8);

                setActivity(totalActivity);
                localStorage.setItem(`activityList`, JSON.stringify({totalActivity: [...totalActivity], reqTime: new Date().getTime()}));
                setStatus(res.status);
            }).catch((error)=>{
            console.log("eerr", error);
            setStatus(404)
            })
        }
    }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      
        <List dense className={classes.list}>
        <div className={classes.divWhite}>Aktywność: </div>
        {activity ? (
        activity.map((value) => {
          if(value!==null) {
            return (
                <Link style={{textDecoration: "none", color: "#f50057"}} href={value.type === "addedToWishlistCharacter" ? `https://shinden.pl/character/${value.targetId}` : `#/card/${value.targetId}`}>
                <ListItem key={value.name} button>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar ${value.shindenId}`}
                      src={value.shindenId != 0 ? `https://cdn.shinden.eu/cdn1/avatars/225x350/${value.shindenId}.jpg?v5` : ""}
                    />
                  </ListItemAvatar>
                  {/* typy w zaleznosci cos */}
                  <ListItemText className={classes.secondary} id={value.targetId} primary={value.username} secondary={value.subText}/>
                </ListItem>
                </Link>
              );
          }
          return ""
        })
      
      ) : 
        status===-1 ? <p className={classes.error404}><span>Error</span><br />Nieobsługiwany błąd strony.</p> :
        status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono aktywości.</p> :
        status===415 ? <p className={classes.error404}><span>415</span><br />Nie pobrano aktywności. <br /> Spróbuj odświeżyć stronę lub zgłoś błąd na discord.</p> :
        <CircularProgress className={classes.CircularProgress} style={{color: "#f50057"}} size={100}/>
      }
      </List> 
    </React.Fragment>
  );
}
