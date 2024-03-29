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

import {
  Button,
} from '@material-ui/core';

// chart test
import {ValueChart, ValueChartData} from "./Chart/cardValueChart";
import {AffectionChart, AffectionChartData} from "./Chart/cardAffectionChart";
import {DereChart, DereChartData} from "./Chart/cardDereChart";
import {RarityChart, RarityChartData} from "./Chart/cardRarityChart";

import CardStats from "./Module/CardStats.js";

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

      const [openCardStats, setOpenCardStats] = React.useState(false);

      const handleClickOpenCardStats = () => {
        setOpenCardStats(true);
      };
      const handleCloseCardStats = () => {
        setOpenCardStats(false);
      };

      // ValueChartData.datasets[0].data = [14,122,31]
      // AffectionChartData.datasets[0].data = [43,62,36,43,62,36,43,62]

    return (
      <>
        <div>test</div>
        <Button variant="outlined" onClick={handleClickOpenCardStats}>
          odpal staty
        </Button>
        <CardStats
                  {...props}
                  openCardStats={openCardStats}
                  handleCloseCardStats={handleCloseCardStats}
                />
        {/* <cardStats /> */}
        {/* <div style={{width: 700}}>
          <RarityChart />
        </div>
        <div style={{width: 350}}>
          <ValueChart />
        </div>
        <div style={{width: 350}}>
          <DereChart />
        </div>
        <div style={{width: 700}}>
          <AffectionChart />
        </div> */}
      </>
    )
}

export default Test;