import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import ListIcon from '@material-ui/icons/List';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import Search from "./Search";

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
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  button: {
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
}));

export default function SearchAppBar(props) {
  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
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
            <Button href={`#/user/${userID}/profile`}><AccountCircleIcon /><a className={classes.button}> Profil</a></Button>
            <Button href={`#/user/${userID}/cards`}><AppsRoundedIcon /><a className={classes.button}> Karty</a></Button>
            <Button href={`#/user/${userID}/wishlist`}><ListIcon /><a className={classes.button}> Lista życzeń</a></Button>
          </ButtonGroup>
          <Search {...props} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
