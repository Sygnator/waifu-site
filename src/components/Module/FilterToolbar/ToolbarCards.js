import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import Search from "../Search";
import Filter from "./NewCardsFilter.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  card: {
    flexGrow: 1,
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  icon: {
    color: "#ffffff",
  },

}));

export default function SearchAppBar({props, profileData}) {
  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const [open, setOpen] = useState(false);

  // useEffect(()=>{
  //   setProfile(profileData)
  //   console.log(profile, "data - profile - useEffect");
  // }, [])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
          
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href={`#/`}
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Pocket-Waifu
          </Typography>
          <ButtonGroup disableElevation variant="contained" color="primary" className={classes.card}>
            <Button href={`#/user/${userID}/profile`}>Profil</Button>
            <Button href={`#/user/${userID}/cards`}>Karty</Button>
          </ButtonGroup>
          <IconButton className={classes.icon} onClick={handleToggle}>
                <SettingsIcon />
            </IconButton>
          <Search {...props} />
        </Toolbar>
        <div >
          {open ? <Filter props={props} profileData={profileData} ></Filter> : ""}
        </div>
      </AppBar>
    </div>
  );
}
