import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';


import Search from "./Module/Search.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  startButton: {
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: "auto",
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  settingsButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  title: {
    maxWidth: 150,
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
  a: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  b: {
    minWidth: 400,
    backgroundColor: "rgba(0, 0, 0, 0)",
    "& .MuiBottomNavigationAction-root": {
      color: "#fff",
    },
    "& .Mui-selected": {
      backgroundColor: "rgba(100, 0, 0, 0)",
      color: "#f50057",
    },
  },

  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
}));

export default function SearchAppBar({props, pageValue}) {
  /*
    pageValue:
    0 - profile
    1 - cards
    2 - wishlist
  */

  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const [openSettings, setOpenSettings] = React.useState(false);
  const [cardOnPage, setCardOnPage] = React.useState(200);

  const [state, setState] = React.useState(false);

  const handleChangeSettings = () => {
    console.log(`Tutaj będzie funkcja zatwierdzająca`);
  };

  const menuRoute = (key) => {
    switch (key) {
      case "mainPage":
          window.location.href=`#/`;
          window.location.reload();
        break;
      case "profile":
          window.location.href=`#/user/${userID}/profile`;
          window.location.reload();
        break;
      case "cards":
          window.location.href=`#/user/${userID}/cards`;
          window.location.reload();
        break;
      case "wishlist":
          window.location.href=`#/user/${userID}/wishlist`;
          window.location.reload();
        break;
    
      default:
        break;
    }
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "bottom"
      })}
      role="menu"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button key={"mainPage"} onClick={() => {menuRoute("mainPage")}} >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Strona Główna"} />
        </ListItem>
        <ListItem button key={"profile"} onClick={() => {menuRoute("profile")}} >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={"Profil"} />
        </ListItem>
        <ListItem button key={"cards"} onClick={() => {menuRoute("cards")}} >
          <ListItemIcon>
            <ViewCarouselIcon />
          </ListItemIcon>
          <ListItemText primary={"Karty"} />
        </ListItem>
        <ListItem button key={"wishlist"} onClick={() => {menuRoute("wishlist")}} >
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary={"Lista życzeń"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"settings"} onClick={()=>setOpenSettings(true)} >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Ustawienia"} />
        </ListItem>
      </List>
    </div>
  );

  const errorSettings = cardOnPage<100;

  const dialogSettings = () => (
    <Dialog disableBackdropClick disableEscapeKeyDown open={openSettings} onClose={()=>setOpenSettings(false)}>
    <DialogTitle>Ustawienia</DialogTitle>
    <DialogContent>
      <form className={classes.container}>
        <FormControl className={classes.formControl} error={errorSettings}>
          <FormLabel>Kart na stronie: </FormLabel>
          <Input
          className={classes.input}
          value={cardOnPage}
          margin="dense"
          onChange={(event)=>setCardOnPage(event.target.value)}
          inputProps={{
            step: 10,
            min: 0,
            max: 300,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
        <FormHelperText>Kart nie może być mniej niż 100.</FormHelperText>
        </FormControl>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>setOpenSettings(false)} color="primary">
        Anuluj
      </Button>
      <Button onClick={()=>handleChangeSettings()} color="primary">
        Zatwierdź
      </Button>
    </DialogActions>
  </Dialog>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>

          <IconButton
            edge="start"
            className={classes.startButton}
            color="inherit"
            aria-label="open start"
            href={`#/`}
          >
            <HomeIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Pocket-Waifu
          </Typography>

          <div className={classes.a}>
          <BottomNavigation
            value={pageValue}
            showLabels
            className={classes.b}
          >
            <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} href={`#/user/${userID}/profile`} />
            <BottomNavigationAction label="Karty" icon={<ViewCarouselIcon />}  href={`#/user/${userID}/cards`} />
            <BottomNavigationAction label="Lista życzeń" icon={<FavoriteIcon />} href={`#/user/${userID}/wishlist`} />
          </BottomNavigation>
          </div>

          <Search {...props} />

          <IconButton
            edge="start"
            className={classes.settingsButton}
            color="inherit"
            aria-label="open settings"
            onClick={()=>setOpenSettings(true)}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton
            edge="menu"
            className={classes.menuButton}
            color="inherit"
            aria-label="open menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          
          <SwipeableDrawer
            anchor={"top"}
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
          {list()}
        </SwipeableDrawer>
        </Toolbar>
      </AppBar>

      {dialogSettings()}
      
    </div>
  );
}
