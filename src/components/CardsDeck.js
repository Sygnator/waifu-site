import React, { useEffect, useState } from 'react';
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Link,
  } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Toolbar from "./Module/FilterToolbar/BackToTopCards.js";

import testCards from "./testCard";
import LazyCardMedia from "./Module/LazyCardMedia.js";

import useFilterData from "./filterHook";
import useWaifuCardsData from "./cardsHook";
import useProfileData from "./profileHook";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
    },
    cardsContainer: {
        flexGrow: 1,
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px"
    },
    cardStyle: {
        paddingTop: "20px",
        backgroundColor: "#272a33",
        width: "240px",
        height: "410px"
    },
    cardContent: {
        textAlign: "center",
        color: "white"
    },
    cardMedia: {
        width: "190px",
        height: "276px",
        margin: "auto"
    },
    id: {
        fontWeight: "bold",
    },
    link: {
        color:"#495dcc",
    },
    
}));



const CardsDeck = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    // wszystkie moje grzechy :/

    const [waifuCardsData, setWaifuCardsData] = useWaifuCardsData(userID);
    const [profilData, setProfilData] = useProfileData(userID);

    // const filter = {
    //     orderBy: "id", //id, idDes, name, nameDes, rarity, rarityDes, title, titleDes, health, healthDes, atack, atackDes, defence, defenceDes
    //     includeTags: [],
    //     excludeTags: [],
    //     searchText: null
    // };

    const [filterData, setFilterData] = useFilterData();

    // useEffect(() => {
    //     if(waifuCardsData===undefined) {
    //         console.info("Pobieram dane z api.")
    //         // axios.post(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/0/10000`, filter).then((res)=> {
    //         //     const newWaifuCardsData = res.data;
    //         //     setWaifuCardsData(newWaifuCardsData)
    //         // })

    //         setWaifuCardsData(testCards) 
    //     }
    // }, []);

    
    const getWaifuCard = (waifuCard) => {
        const { id, imageUrl, name, animeTitle, characterUrl, isTradable, isInCage, isUnique, isUltimate, affection, tags } = waifuCard
        //console.log(tags)
        return (
            <Grid item key={id}>
                <Card className={classes.cardStyle}>
                    <LazyCardMedia image={imageUrl} alt={id} className={classes.cardMedia} {...props} ></LazyCardMedia>
                    {/* <CardMedia image={imageUrl} className={classes.cardMedia}></CardMedia> */}
                    <CardContent className={classes.cardContent}>
                        <a className={classes.id}>{id}</a>: <Link className={classes.link} href={characterUrl} target="_blank">{name}</Link>
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") ? "" : "🔃"}`}
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") ? "" : "💗"}`}
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") ? "" : "📝"}`}
                        {`${isUnique ? "💠" : ""}`}
                        {`${isUltimate ? "🎖️" : ""}`}
                        {`${affection==="Pogarda" ? "💔" : ""}`}
                        {`${isTradable ? " " : "⛔"}`}
                        {`${isInCage ? "🔒" : ""}`}
                        <br/>
                        {`${animeTitle}`}
                    </CardContent>
                </Card>
            </Grid>
        )
    }


    return (
        <>
            <div>
            <Toolbar {...props} />
            </div>
            <div className={classes.root}>
            {waifuCardsData ? (
            <Grid container spacing={2} justify="center" className={classes.cardsContainer}>
                {waifuCardsData.map((x)=>getWaifuCard(x))}
            </Grid>
            ) : (
                <center><CircularProgress size={100}/></center>
            )}
            </div>
        </>
    )
}

export default CardsDeck;