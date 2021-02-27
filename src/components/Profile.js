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

// import testProf from "./TestData/testProf";

import LazyCardMedia from "./Module/LazyCardMedia.js";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: "white",
        textAlign: "center",
        maxWidth: "98%",
    },
    cardsContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardStyle: {
        border: "0px",
        backgroundColor: "rgba(0,0,0,0)",
    },
    cardContent: {
        textAlign: "center",
        color: "white"
    },
    cardMedia: {
        width: "190px",
        // height: "276px",
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
        alignItems: 'center',
        margin: "auto",
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        paddingBottom: "20px",
      },
      img: {
        width: "350px",
        height: "508px",
        marginLeft: "auto",
      },
      details: {
        textAlign: "left",
        paddingTop: "50px",
        fontSize: "32px",
      },
      exchangeConditions: {
          paddingTop: "25px",
          paddingBottom: "20px",
          fontSize: "25px",
      },
      profilCenter: {
        textAlign: "center",
        fontSize: "32px",
      },

}));

const Profile = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [profilData, setProfilData] = useState();

    useEffect(()=> {
            axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
                const newProfilData = res.data;
                setProfilData(newProfilData)
            })
    }, [])


    const getWaifuCard = (waifuCard) => {
        const { profileImageUrl, id } = waifuCard
        //console.log(tags)
        return (
            <Grid item key={id}>
                <Card variant="outlined" className={classes.cardStyle}>
                    <div className={classes.cardMedia}>
                        <LazyCardMedia image={profileImageUrl} alt={id}  {...props} ></LazyCardMedia>
                    </div>
                </Card>
            </Grid>
        )
    }

    const renderCardsCount = (profilData, version=true) => {

        return (
            <div className={version ? classes.details : classes.profilCenter}>
                Posiadane karty:
                <div>SSS: {`${profilData.cardsCount.SSS}`}</div>
                <div>SS: {`${profilData.cardsCount.SS}`}</div>
                <div>S: {`${profilData.cardsCount.S}`}</div>
                <div>A: {`${profilData.cardsCount.A}`}</div>
                <div>B: {`${profilData.cardsCount.B}`}</div>
                <div>C: {`${profilData.cardsCount.C}`}</div>
                <div>D: {`${profilData.cardsCount.D}`}</div>
                <div>E: {`${profilData.cardsCount.E}`}</div>
                <div>Wszystkie: {`${profilData.cardsCount.total}/${profilData.maxCardCount}`}</div>
            </div>
        )
    }

    return (
        <>
            <Toolbar props={props} pageValue={0} />
            <div className={classes.root}>
                {profilData ? (
                    <div className={classes.root}>
                        <div>
                            <Grid container spacing={3} className={classes.profileCards}>
                                {profilData.waifu===null ? (
                                    <Grid item xs={12} sm={12} key={profilData.cardsCount.total}>
                                        {renderCardsCount(profilData, false)}
                                    </Grid>
                                ) : (
                                <>
                                    <Grid item xs={12} md={6} key={profilData.waifu.profileImageUrl}>
                                        <CardMedia component='img' image={profilData.waifu.profileImageUrl} alt={profilData.waifu.id} className={classes.img}></CardMedia>
                                    </Grid>
                                    <Grid item xs={12} md={6} key={profilData.cardsCount.total}>
                                        {renderCardsCount(profilData)}
                                    </Grid>
                                </>
                                )}
                            </Grid>
                        </div>
                        <div className={classes.exchangeConditions}>{profilData.exchangeConditions}</div>
                        <div>
                            {profilData.gallery ? (
                            <Grid container justify="center" alignItems="baseline" spacing={2} className={classes.cardsContainer}>
                                {profilData.gallery.map((x)=>getWaifuCard(x))}
                            </Grid>
                            ) : (
                                ""
                            )}
                        </div>
                        {profilData.expeditions.length ? "Pewnie się zastanawiasz czemu to coś jest? Nie martw się, ja też nie wiem." : "Pewnie zastanawiasz się czemu tu nic nie ma? Nie martw się, ja też nie wiem."}
                    </div>
                ) : (
                    <center><CircularProgress size={100}/></center>
                )}
            </div>
        </>
    )
}

export default Profile;