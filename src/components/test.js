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
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";

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
    backgroundColor: "#30333a",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "8px",
    marginTop: -30,
    marginRight: "auto",
    marginLeft: "auto",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#30333a",
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: -100,
    marginLeft: "20%",
    border: "2px solid #20232a",
    padding: 8,
    background: "linear-gradient(to bottom, #20232a, #30333a)",
    position: "relative",
    display: "block",

    "& .MuiAvatar-img": {
      borderRadius: "50%",
    },

    [theme.breakpoints.down('md')]: {
      marginRight: "auto",
      marginLeft: "auto",
    },
  },
  nikt: {
    color: "#f50057",
    // marginTop: -90,
    // marginLeft: "50%",

    [theme.breakpoints.down('md')]: {
      textAlign: "center",
    },
  },
  rank: {
    color: "#ab003c",

    [theme.breakpoints.down('md')]: {
      textAlign: "center",
    },
  },
  gridProfile: {
    whiteSpace: "nowrap",
    // position: "absolute",
    display: "block",
  },
}));

const Test = ({props,pageValue}) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    return (
      <>
        <Paper className={classes.root}>
            <Toolbar props={props} pageValue={0} />
          <div className={classes.shadow} ></div>
        </Paper>

          <Grid container className={classes.mainPage}>
            <Grid item md={4} xs={12}>

            <Grid container justify="center" alignItems="center">
              <Grid item lg={6} xs={12} className={classes.gridProfile}>
                <Avatar src={`${process.env.PUBLIC_URL}/Pictures/avatar.png`} className={classes.avatar} />
              </Grid>
              <Grid item lg={6} xs={12} className={classes.gridProfile} >
                <Typography variant="h3" display="block" className={classes.nikt}>????</Typography>
                <Typography variant="h6" className={classes.rank}>Ranga: ???</Typography>
              </Grid>
            </Grid>  
            
            </Grid>

            <Grid item md={8} xs={12} >

            <Grid container>
              <Grid item md={6} xs={12}>

                statystyki

              </Grid>
              <Grid item md={6} xs={12}>

                wyprawy

              </Grid>
            </Grid>

              galeria

            </Grid>

          </Grid>

    </>
    )
}

export default Test;