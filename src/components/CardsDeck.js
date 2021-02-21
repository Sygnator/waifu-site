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

import Toolbar from "./Module/BackToTop";

import testCards from "./TestData/testCard";
import testProf from "./TestData/testProf";

import LazyCardMedia from "./Module/LazyCardMedia.js";
import Pagination from '@material-ui/lab/Pagination';

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
        color: "white",
    },
    cardMedia: {
        width: "190px",
        height: "276px",
        margin: "auto",
    },
    id: {
        fontWeight: "bold",
    },
    link: {
        color:"#495dcc",
    },
    p: {
        textDecoration: "none",
        padding: "0px",
        margin: "0px",
    },
    pagination: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    ul: {
        justifyContent: 'center',
        '& li': {
          '& button, div': {
          color: "#fff",
          },
          textDecoration: "none",
        },
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

    const [page, setPage] = useState(1);

    const [pageCount, setPageCount] = useState(1);

    const [cardsOnPage, setCardsOnPage] = useState(1);

    const localFilter = JSON.parse(localStorage.getItem(`u${userID}filter`));
    const localCardsOnPage = JSON.parse(localStorage.getItem(`cardsOnPage`));

    useEffect(() => {

        if(profileData!=undefined) {
            const cardsAmount = cardAmount(profileData);

            if(localCardsOnPage===null) {
                setCardsOnPage(cardsAmount)
            } else {
                console.log(localCardsOnPage);
                setCardsOnPage(localCardsOnPage)
                setPageCount(Math.ceil(cardsAmount/localCardsOnPage));
            }

        }

    }, [profileData]);

    useEffect(async () => {
        console.log(`useEffect - test`);

        if(profileData===undefined) {
            console.info("Pobieram dane z api - profil")
            await axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
                const newProfilData = res.data;
                setProfileData(newProfilData);
            })

            // setProfileData(testProf)
        }

    }, []);

    useEffect(async () => {
        console.log(`useEffect3 - test`,page);

        if(localFilter===null) {
            filterUpdate(emptyFilter)
        } 

        setWaifuCardsData(undefined)

        if(profileData!=undefined) {
            await axios.post(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/${(page-1)*cardsOnPage}/${page*cardsOnPage}`, localFilter).then((res)=> {
                    const newWaifuCardsData = res.data;
                    setWaifuCardsData(newWaifuCardsData);
                    if(newWaifuCardsData.length<100) {
                        setPageCount(1);
                    } else if (newWaifuCardsData.length<cardsOnPage) {
                        setPageCount(1);
                    }

                    console.log(newWaifuCardsData.length);
                       
            })

            // setWaifuCardsData(testCards); 
        }
    }, [page, cardsOnPage]);

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
                            <p className={classes.p}>
                                {`${tags.map((e)=> e.toLowerCase()).indexOf("wymiana") > -1 ? "🔃" : ("")}`}
                                {`${tags.map((e)=> e.toLowerCase()).indexOf("ulubione") > -1 ? "💗" : ""}`}
                                {`${tags.map((e)=> e.toLowerCase()).indexOf("rezerwacja") > -1 ? "📝" : ""}`}
                                {`${isUnique ? "💠" : ""}`}
                                {`${isUltimate ? "🎖️" : ""}`}
                                {`${affection==="Pogarda" ? "💔" : ""}`}
                                {`${isTradable ? " " : "⛔"}`}
                                {`${isInCage ? "🔒" : ""}`}
                            </p>
                        {`${animeTitle}`}
                    </CardContent>
                </Card>
            </Grid>
        )
    }

    function cardAmount(prof) {
        const {sssCount, ssCount, sCount, aCount, bCount, cCount, dCount, eCount} = prof;
        return sssCount + ssCount + sCount + aCount + bCount + cCount + dCount + eCount;
    }

    const pageChange = (event, value) => {
        setPage(value);
      };

    const renderPagination = (page, pageCount) => {
        return (
            <div className={classes.pagination}>
            <Pagination 
                count={pageCount}
                page={page}
                onChange={pageChange}
                boundaryCount={2}
                classes={{ul: classes.ul}}
            />
            </div>
        )
    }


    return (
        <>
            <div className={classes.root}>
            {waifuCardsData&&profileData ? (
            <>
            <Toolbar props={props} pageValue={1} showFilter={true} profileData={profileData} />
            <Grid container spacing={2} justify="center" className={classes.cardsContainer}>
                {waifuCardsData.map((x)=>getWaifuCard(x))}
            </Grid>
            {pageCount>1 ? renderPagination(page, pageCount) : ""}
            </>
            ) : (
                <>
                <Toolbar props={props} pageValue={1} />
                <center><CircularProgress size={100}/></center>
                </>
            )}
            </div>
        </>
    )
}

export default CardsDeck;