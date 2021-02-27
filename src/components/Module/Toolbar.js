import React, { useEffect, useState, useRef } from 'react';
import clsx from "clsx";
import { fade, makeStyles } from '@material-ui/core/styles';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Tooltip,
  CircularProgress,
  Snackbar,
  Avatar,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import FilterListIcon from '@material-ui/icons/FilterList';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

import Search from "./Search.js";
import Filter from "./Filter.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  AppBar: {
    backgroundColor: "rgba(32, 35, 42, .5)",
    alignItems: "center",
  },
  AppBarE: {
    backgroundColor: "rgba(32, 35, 42, .99)",
    alignItems: "center",
  },
  Toolbar: {
    width: "100%",
    maxWidth: "90%",
  },
  logo: {
    marginRight: 100,
    [theme.breakpoints.down('md')]: {
      marginRight: 50,
    },
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
    marginLeft: 20,
    marginRight: "auto",
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  b: {
    // minWidth: 300,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    "& .MuiBottomNavigationAction-root": {
      color: "#fff",
    },
    "& .Mui-selected": {
      backgroundColor: "rgba(100, 0, 0, 0)",
      color: "#f50057",
    },
  },
  c: {
    minWidth: 105,
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: "#3f51b5",
    position: 'absolute',
    top: '40%',
    left: '40%',
    marginTop: -12,
    marginLeft: -12,
  },

  filter: {
    minWidth: 80,
    marginRight: 15,
    backgroundColor: "rgba(0, 0, 0, 0)",
    "& .Mui-selected": {
      backgroundColor: "rgba(100, 0, 0, 0)",
      color: "#fff",
    },
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },

  filterHidden: {
    minWidth: 80,
    marginRight: 15,
    visibility: "hidden",
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

export default function SearchAppBar({props, pageValue=-1, showFilter=false, profileData=null}) {
  /*
    pageValue:
    -1 - null
    0 - profile
    1 - cards
    2 - wishlist
  */

  const classes = useStyles();
  const timer = useRef();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const [openSettings, setOpenSettings] = useState(false);
  const [cardOnPage, setCardOnPage] = useState(200);

  const [state, setState] = useState(false);

  const [loading, setLoading] = useState(false);

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [bar, setBar] = useState(false);

  const scroll = () => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        let maxScroll = document.body.scrollHeight - window.innerHeight;
        
        // && currentScrollPos <= maxScroll
        setBar(currentScrollPos > 0);

      }
    }
  }
  
  scroll()

  const handleToggleFilter = () => {
    setOpenFilter((prevOpenFilter) => !prevOpenFilter);
  };

  const handleChangeSettings = () => {
    if (!loading) {
      // setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        // setSuccess(true);
        setLoading(false);

        if (!(cardOnPage<100||cardOnPage>4000)) {
          localStorage.setItem(`cardsOnPage`, JSON.stringify(cardOnPage))
          setOpenSnackbarSuccess(true);
          setOpenSettings(false);
        } else {
          setOpenSnackbarError(true);
        }

      }, 350);
    }
  };

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbarSuccess(false);
  };

  const handleCloseSnackbarError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbarError(false);
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
      case "wikiPW":
          window.location.replace(`https://wiki.sanakan.pl/`);
          // window.location.reload();
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

  useEffect(() => {

    const localCardsOnPage = JSON.parse(localStorage.getItem(`cardsOnPage`));

    if(localCardsOnPage!=null) {
      setCardOnPage(localCardsOnPage);
    }
    
  }, []);

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

        <ListItem button key={"wikiPW"} onClick={() => {menuRoute("wikiPW")}} >
          <ListItemIcon>
            <ImportContactsIcon />
          </ListItemIcon>
          <ListItemText primary={"Wiki Pocket Waifu"} />
        </ListItem>
        
        {pageValue>-1 ? (
        <div>
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
        </div>
        ) : ""}

      </List>

      {showFilter ? (
        <div>
      <Divider />
      <List>
        <ListItem button key={"filter"} onClick={handleToggleFilter} >
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary={"Filtry kart"} />
        </ListItem>
      </List>
      </div>
      ) : ""}
      


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

  const errorSettings = cardOnPage<100||cardOnPage>4000||openSnackbarError===true;

  const dialogSettings = () => (
    <Dialog disableBackdropClick disableEscapeKeyDown open={openSettings} onClose={()=>setOpenSettings(false)}>
      <div className={classes.wrapper}>
    <DialogTitle>Ustawienia</DialogTitle>
    <DialogContent>
      <form className={classes.container}>
        <FormControl className={classes.formControl} error={errorSettings}>
          <FormLabel>Kart na stronie: </FormLabel>
          <Input
          className={classes.input}
          value={cardOnPage}
          disabled={loading}
          margin="dense"
          onChange={(event)=>setCardOnPage(event.target.value)}
          inputProps={{
            step: 10,
            min: 100,
            max: 4000,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
        <FormHelperText component="p" variant="standard">Kart nie może być mniej niż 100 <br />oraz więcej niż 4000.</FormHelperText>
        </FormControl>
      </form>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>setOpenSettings(false)} color="primary" disabled={loading}>
        Anuluj
      </Button>
      
      <Button onClick={()=>handleChangeSettings()} color="primary" disabled={loading}>
        Zatwierdź
      </Button>
      {loading && <CircularProgress size={44} className={classes.buttonProgress} />}
      
    </DialogActions>
  </div>
  </Dialog>
  );

  return (
    <div className={classes.root}>

      <Snackbar open={openSnackbarSuccess} autoHideDuration={4000} onClose={handleCloseSnackbarSuccess} anchorOrigin={ { vertical: 'top', horizontal: 'center' } } >
          <Alert onClose={handleCloseSnackbarSuccess} severity="success">
            Poprawnie ustawiono karty na stronie.
          </Alert>
      </Snackbar>

      <Snackbar open={openSnackbarError} autoHideDuration={4000} onClose={handleCloseSnackbarError} anchorOrigin={ { vertical: 'top', horizontal: 'center' } } >
          <Alert onClose={handleCloseSnackbarError} severity="error">
            Błąd! Nie ustawiono poprawnie kart na stronie.
          </Alert>
      </Snackbar>

      <AppBar position="fixed" className={bar ? classes.AppBarE : classes.AppBar}>
        <Toolbar className={classes.Toolbar} >

          <a href={`#/`} className={classes.logo}>
            <Avatar variant="square" src={`${process.env.PUBLIC_URL}/Pictures/pwlogo.png`} />
          </a>

          <div className={classes.a}>

            {pageValue>-1 ? (

              <BottomNavigation
                value={pageValue}
                showLabels
                className={classes.b}
              >
                <BottomNavigationAction label="Profil" icon={<AccountCircleIcon />} href={`#/user/${userID}/profile`} />
                <BottomNavigationAction label="Karty" icon={<ViewCarouselIcon />}  href={`#/user/${userID}/cards`} />
                <BottomNavigationAction className={classes.c} label="Lista życzeń" icon={<FavoriteIcon />} href={`#/user/${userID}/wishlist`} />
              </BottomNavigation>
            ) : ("")}

          </div>
          
            <BottomNavigation
                value={0}
                showLabels
                className={showFilter ? classes.filter : classes.filterHidden}
                onClick={handleToggleFilter}
            >
                <BottomNavigationAction label="Filtry" icon={<FilterListIcon />} />
            </BottomNavigation>
            

          <Search {...props} />

          <Tooltip title="Ustawienia strony" arrow>
          <IconButton
            edge="start"
            className={classes.settingsButton}
            color="inherit"
            aria-label="open settings"
            onClick={()=>setOpenSettings(true)}
          >
            <SettingsIcon />
          </IconButton>
          </Tooltip>

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
        {openFilter ? <Filter props={props} profileData={profileData} ></Filter> : ""}
      </AppBar>

      {dialogSettings()}
    </div>
  );
}
