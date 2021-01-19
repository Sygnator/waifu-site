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

import profileGrid from "./Module/profileGrid";


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
        backgroundColor: "#272a33",
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
    
}));

const Profile = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();
    
    const [profilData, setProfilData] = useState()

    useEffect(() => {
        // axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
        //     const newProfilData = res.data;
        //     setProfilData(newProfilData)
        // })
        setProfilData(testProf)
    }, []);

    return (
        <>
            <Toolbar {...props} />
            <div className={classes.root}>
                {profilData ? (
                    // <Typography align="center">
                    // <div className={classes.content}>
                    // <div className={classes.details}>
                    // <img src={profilData.waifu.imageUrl} alt={profilData.waifu.id} className={classes.img}/>
                    // </div>
                    // <div className={classes.details}>
                    //     <div>{`${profilData.sssCount}`}</div>
                    //     <div>{`${profilData.ssCount}`}</div>
                    //     <div>{`${profilData.sCount}`}</div>
                    //     <div>{`${profilData.aCount}`}</div>
                    //     <div>{`${profilData.bCount}`}</div>
                    //     <div>{`${profilData.cCount}`}</div>
                    //     <div>{`${profilData.dCount}`}</div>
                    // </div>
                    // </div>
                    // </Typography>
                    <div><Paper elevation={0} >
                        123
                    </Paper></div>
                ) : (
                    <center><CircularProgress size={100}/></center>
                )}
            </div>
        </>
    )
}

export default Profile;