import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";

import CryptoJS from "crypto-js";

import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import emoji from "./emoji.js";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    color: "c1c1c1"
  },
}));

const Test = (props) => {

    // const { match, history } = props;
    // const { params } = match;
    // const { userID } = params;

    const classes = useStyles();

    useEffect(()=> {
        console.log("Test - shinden api");

        document.title = "Pocket Waifu - test"

        // axiosCookieJarSupport(axios);

        // const cookieJar = new tough.CookieJar();

        // axios
        //   .get('https://google.com', {
        //     jar: cookieJar,
        //     withCredentials: true,
        //   })
        //   .then((response) => {
        //     const config = response.config;
        //     console.log(config.jar.toJSON());
        //   })
        //   .catch((err) => {
        //     console.error(err.stack || err);
        //   });



          // document.cookie = "sanakan=waifu";
          // const cookieX = document.cookie;
          // console.log(cookieX);

          // axios({
          //   method: 'get',
          //   url: `https://shinden.pl/api/user/3/info`,
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Accept": "*/*",
          //     // "withCredentials": true,
          //     // "xhrFields": {
          //     //   withCredentials: true
          //     // },
          //     "Access-Control-Allow-Origin": "<origin>",
          //     "crossDomain": true
          //   },
          // }).then((res)=> {
          //   console.log(res.data, "Api shinden");
          // }).catch((error)=>{
          //   console.log(error);
          // });


/*           var config = {
            method: 'get',
            url: 'https://shinden.pl/api/user/3/info',
            headers: {
              'Accept': 'application/json',
              'User-Agent': '',
              'Cookie': '',
              "crossDomain": true,
            }
          };

          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });

          */

      }, [])

      const [filterTagsMethod, setFilterTagsMethod] = React.useState(false);

      const handleChangeFilterTagsMethod = (event) => {
        setFilterTagsMethod(event.target.checked);
        console.log(filterTagsMethod, event.target.checked);
      };

      const xxx = "bla bla 😆😆😆 1233444 😛 $%% to😣 nei sjsj❤️jsd jeeda ekwn!39393"

    return (
      <>
        <div>test</div>
          <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>AND</Grid>
            <Grid item>
              <Switch
                defaultChecked
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
                checked={filterTagsMethod}
                onChange={handleChangeFilterTagsMethod}
                name="filterTagsMethod"
              />
            </Grid>
            <Grid item>OR</Grid>
          </Grid>
        </Typography>
        <div style={{color: "#eee"}}>Przed: {xxx}</div>
        <div style={{color: "#eee"}}>Po: {emoji(xxx)}</div>
      </>
    )
}

export default Test;