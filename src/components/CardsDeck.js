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

import Toolbar from "./Module/BackToTop.js";

import cardsA from "./testCard.js";

const useStyles = makeStyles({
    cardsContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardStyle: {
        backgroundColor: "#272a33",
    },
    cardContent: {
        textAlign: "center",
        color: "white"
    },
    cardMedia: {
        width: "190px", 
        height: "276px",
        margin: "auto",
    },
});


const CardsDeck = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;
    
    const classes = useStyles();
    
    const [waifuCardsData, setWaifuCardsData] = useState()
    
    useEffect(() => {
        axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/0/10000`).then((res)=> {
            const newWaifuCardsData = res.data;
            setWaifuCardsData(newWaifuCardsData)
        })
    }, []);

    const getWaifuCard = (waifuCard) => {
        const { id, imageUrl, name, animeTitle, characterUrl, isTradable, isInCage, isUnique, isUltimate, affection, tags } = waifuCard
        console.log(tags)
        return (
            <Grid item xs={6} sm={4} lg="2" key={id}>
                <Card className={classes.cardStyle}>
                    <CardMedia image={imageUrl} className={classes.cardMedia}></CardMedia>
                    <CardContent className={classes.cardContent}>
                        {`${id}: `}<Link href={characterUrl} target="_blank">{name}</Link>
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
            <Toolbar {...props} />
            {waifuCardsData ? (
            <Grid container spacing={2} className={classes.cardsContainer}>
                {waifuCardsData.map((x)=>getWaifuCard(x))}
            </Grid>
            ) : (
                <center><CircularProgress size={100}/></center>
            )}
        </>
    )
}

export default CardsDeck;
