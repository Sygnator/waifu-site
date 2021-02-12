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
import ToolbarP from "./Module/BackToTop";

import testCards from "./testCard";
import testProf from "./testProf";
import LazyCardMedia from "./Module/LazyCardMedia.js";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        maxWidth: "98%",
    },
    cardsContainer: {
        flexGrow: 1,
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "0px",
            paddingRight: "0px",
          },
    },
    cardStyle: {
        paddingTop: "20px",
        backgroundColor: "#272a33",
        width: "240px",
        height: "410px",
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
    
    const [waifuCardsData, setWaifuCardsData] = useState();
    const [profileData, setProfileData] = useState();

    const emptyFilter = {
        orderBy: "id", //id, idDes, name, nameDes, rarity, rarityDes, title, titleDes, health, healthDes, atack, atackDes, defence, defenceDes
        includeTags: [],
        excludeTags: [],
        searchText: null
    };

    const filterUpdate = (filterData) => {
      
        localStorage.setItem(`u${userID}filter`, JSON.stringify(filterData))

        return JSON.parse(localStorage.getItem(`u${userID}filter`));
      };

    const [filter, setFilter] = useState(emptyFilter);

    const [change, setChange] = useState(JSON.parse(localStorage.getItem(`u${userID}test`)))



    const localFilter = JSON.parse(localStorage.getItem(`u${userID}filter`));

    useEffect(() => {
        console.log(`useEffect - test`);

        if(localFilter===null) {
            filterUpdate(emptyFilter)
        } 

        console.log(`localFilter`, localFilter);
        
        if(profileData===undefined) {
            console.info("Pobieram dane z api - profil")
            axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
                const newProfilData = res.data;
                setProfileData(newProfilData)
        })
        if(waifuCardsData===undefined) {
            console.info("Pobieram dane z api - karty")
            axios.post(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/0/10000`, localFilter).then((res)=> {
                const newWaifuCardsData = res.data;
                setWaifuCardsData(newWaifuCardsData)
        })

            // setWaifuCardsData(testCards) 
        }

            // setProfileData(testProf)
        }
    }, [filter]);


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
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ("")}`}
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
                        {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
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
            <div className={classes.root}>
            {waifuCardsData ? (
            <>
            <Toolbar props={props} profileData={profileData} />
            <Grid container spacing={2} justify="center" className={classes.cardsContainer}>
                {waifuCardsData.map((x)=>getWaifuCard(x))}
            </Grid>
            </>
            ) : (
                <>
                <ToolbarP {...props} />
                <center><CircularProgress size={100}/></center>
                </>
            )}
            </div>
        </>
    )
}

export default CardsDeck;