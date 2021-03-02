import React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";
import Toolbar from "../Module/BackToTop";

const useStyles = makeStyles(() => ({
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
}));

const backgroundImg = (profil) => {
  return (!profil || !profil.backgroundImageUrl)
    ? {backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,}
    : {backgroundImage: `url(${profil.backgroundImageUrl})`,}
}

const Header = (props) => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} style={backgroundImg(props.profile)}>
          <Toolbar props={props} pageValue={0} />
        <div className={classes.shadow} ></div>
      </Paper>
    </>
  );
};

export default Header;