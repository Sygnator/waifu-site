import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

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

          axios({
            method: 'get',
            url: `https://shinden.pl/api/user/3/info`,
            headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Cookie": "",
              "withCredentials": true,
              "User-Agent": "Waifu/Sanakan",
            },
          }).then((res)=> {
            console.log(res.data, "Api shinden");
          }).catch((error)=>{
            console.log(error);
          });

      }, [])

    return (
      <>
        <div>test</div>
      </>
    )
}

export default Test;