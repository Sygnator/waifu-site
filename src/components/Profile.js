import React, { useEffect, useState } from 'react';
import Toolbar from "./Module/BackToTop";
import {
    Grid,
    GridList,
    GridListTile,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Typography,
    Paper,
    Link,
  } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import testProf from "./testProf";

import LazyCardMedia from "./Module/LazyCardMedia.js";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
        textAlign: "center",
    },
    cardsContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardStyle: {
        backgroundColor: "rgb(0,0,0,0)",
    },
    cardContent: {
        textAlign: "center",
        color: "white"
    },
    cardMedia: {
        width: "190px", 
        height: "276px",
        // margin: "auto",
    },
    details: {
        display: 'block',
        float: "left",
        flexDirection: 'column',
      },
      content: {
        // float: "left",
        // display: 'block',
        backgroundColor: "#272a33",
        flex: '1 0 auto',
        padding: "auto",
        marginLeft: "auto",
        marginRight: "auto",
      },
      cover: {
        width: "100px",
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      paper: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      },
      profileCards: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
      },
      img: {
        width: "475px", 
        height: "677px",
        // margin: "auto",
      },
      details: {
        textAlign: "left",
        paddingTop: "30px",
        fontSize: "40px",
      },
      exchangeConditions: {
          paddingTop: "20px",
          paddingBottom: "20px",
          fontSize: "35px",
      },
    
}));

const Profile = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();
    
    const [profilData, setProfilData] = useState()

    useEffect(() => {
        if(profilData===undefined) {
            axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
                const newProfilData = res.data;
                setProfilData(newProfilData)
            })
        }
    }, []);

    function amount(prof) {
        const {sssCount, ssCount, sCount, aCount, bCount, cCount, dCount, eCount} = prof;
        return sssCount + ssCount + sCount + aCount + bCount + cCount + dCount + eCount;
    }

    const getWaifuCard = (waifuCard) => {
        const { profileImageUrl, id } = waifuCard
        //console.log(tags)
        return (
            <Grid item key={id}>
                <Card className={classes.cardStyle}>
                    <LazyCardMedia image={profileImageUrl} alt={id} className={classes.cardMedia} {...props} ></LazyCardMedia>
                </Card>
            </Grid>
        )
    }

    return (
        <>
            <Toolbar {...props} />
            <div className={classes.root}>
                {profilData ? (
                    <div className={classes.root}>
                        <div>
                            <Grid container spacing={2} className={classes.profileCards}>
                                <Grid item xs={6} key={profilData.waifu.profileImageUrl}><img src={profilData.waifu.profileImageUrl} alt={profilData.waifu.id} className={classes.img}/></Grid>
                                <Grid item xs={6} key={profilData.waifu.id}>
                                    <div className={classes.details}>
                                        Posiadane karty:
                                        <div>SSS: {`${profilData.sssCount}`}</div>
                                        <div>SS: {`${profilData.ssCount}`}</div>
                                        <div>S: {`${profilData.sCount}`}</div>
                                        <div>A: {`${profilData.aCount}`}</div>
                                        <div>B: {`${profilData.bCount}`}</div>
                                        <div>C: {`${profilData.cCount}`}</div>
                                        <div>D: {`${profilData.dCount}`}</div>
                                        <div>E: {`${profilData.eCount}`}</div>
                                        <div>SUMA: {`${amount(profilData)}`}</div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.exchangeConditions}>{profilData.exchangeConditions}</div>
                        <div>
                            {profilData.gallery ? (
                            <Grid container spacing={2} className={classes.cardsContainer}>
                                {profilData.gallery.map((x)=>getWaifuCard(x))}
                                {/* {console.log(profilData.gallery)} */}
                            </Grid>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ) : (
                    <center><CircularProgress size={100}/></center>
                )}
            </div>
        </>
    )
}

export default Profile;