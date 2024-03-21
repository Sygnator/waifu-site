import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
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
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import FilterListIcon from "@material-ui/icons/FilterList";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import DiamondIcon from '@mui/icons-material/Diamond';
import CompareIcon from '@mui/icons-material/Compare';

import Search from "./Search.js";
import Filter from "./Filter.js";
import CardStats from "./../Module/CardStats.js";

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
    [theme.breakpoints.down("md")]: {
      marginRight: 50,
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  startButton: {
    marginRight: theme.spacing(2),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: "auto",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  settingsButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  title: {
    maxWidth: 150,
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  button: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  card: {
    flexGrow: 1,
    // display: 'none',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  a: {
    // display: "block",
    marginLeft: 20,
    marginRight: "auto",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
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
      // color: "#f50057",
    },
  },
  c: {
    minWidth: 105,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: "#3f51b5",
    position: "absolute",
    top: "40%",
    left: "40%",
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
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },

  filterHidden: {
    minWidth: 80,
    marginRight: 15,
    visibility: "hidden",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
  icons: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

export default function SearchAppBar({
  props,
  pageValue = -1,
  showFilter = false,
  profileData = null,
  cardsData = null,
  arrayExportId = [],
}) {
  /*
    pageValue:
    -3 - unique cards
    -2 - card preview
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

  // Icon Hover
  const [isIconUHovered, setIsIconUHovered] = React.useState(false);
  const [isIconWHovered, setIsIconWHovered] = React.useState(false);
  const [isIconSHovered, setIsIconSHovered] = React.useState(false);

  const [openSettings, setOpenSettings] = useState(false);
  const [cardOnPage, setCardOnPage] = useState(200);
  const [cardsStyle, setCardsStyle] = useState("cards");

  const [state, setState] = useState(false);

  const [loading, setLoading] = useState(false);

  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);

  const [bar, setBar] = useState(false);

  const [openCardStats, setOpenCardStats] = React.useState(false);

  const handleClickOpenCardStats = () => {
    setOpenCardStats(true);
  };
  const handleCloseCardStats = () => {
    setOpenCardStats(false);
  };

  const changeUserColor = (pageValue, userColor) => {
    if ((pageValue === 0 || pageValue === 1 || pageValue === 2) && userColor) {
      return userColor;
    } else {
      return "#f50057";
    }
  };

  const scroll = () => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset;
        let maxScroll = document.body.scrollHeight - window.innerHeight;

        // && currentScrollPos <= maxScroll
        setBar(currentScrollPos > 0);
      };
    }
  };

  scroll();

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

        if (!(cardOnPage < 100 || cardOnPage > 4000)) {
          localStorage.setItem(`cardsOnPage`, JSON.stringify(cardOnPage));
          localStorage.setItem(`cardsStyle`, JSON.stringify(cardsStyle));
          setOpenSnackbarSuccess(true);
          setOpenSettings(false);
        } else {
          setOpenSnackbarError(true);
        }
      }, 350);
    }
  };

  const handleCloseSnackbarSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarSuccess(false);
  };

  const handleCloseSnackbarError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbarError(false);
  };

  const menuRoute = (key) => {
    switch (key) {
      case "mainPage":
        window.location.href = `#/`;
        window.location.reload();
        break;
      case "profile":
        window.location.href = `#/user/${userID}/profile`;
        window.location.reload();
        break;
      case "cards":
        window.location.href = `#/user/${userID}/cards`;
        window.location.reload();
        break;
      case "wishlist":
        window.location.href = `#/user/${userID}/wishlist`;
        window.location.reload();
        break;
      case "unique-cards":
        window.location.href = `#/cards/unique`;
        window.location.reload();
        break;
      case "wikiPW":
        window.location.replace(`https://wiki.sanakan.pl/`);
        break;
      case "skalpel":
        window.location.replace(`https://skalpel.sanakan.pl/`);
        break;

      default:
        break;
    }
  };

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
    const localCardsStyle = JSON.parse(localStorage.getItem(`cardsStyle`));

    if (localCardsOnPage != null) {
      setCardOnPage(localCardsOnPage);
    }

    if (localCardsStyle != null) {
      setCardsStyle(localCardsStyle);
    }
  }, []);

  const list = () => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "bottom",
      })}
      role="menu"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          key={"mainPage"}
          onClick={() => {
            menuRoute("mainPage");
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Strona Główna"} />
        </ListItem>

        <ListItem
          button
          key={"wikiPW"}
          onClick={() => {
            menuRoute("wikiPW");
          }}
        >
          <ListItemIcon>
            <ImportContactsIcon />
          </ListItemIcon>
          <ListItemText primary={"Wiki Pocket Waifu"} />
        </ListItem>

        {pageValue === -1 ? (<ListItem
          button
          key={"unique-cards"}
          onClick={() => {
            menuRoute("unique-cards");
          }}
        >
          <ListItemIcon>
            <DiamondIcon />
          </ListItemIcon>
          <ListItemText primary={"Unikatowe Karty"} />
        </ListItem>) : ""}

        {pageValue === -1 ? (<ListItem
          button
          key={"skalpel"}
          onClick={() => {
            menuRoute("skalpel");
          }}
        >
          <ListItemIcon>
            <CompareIcon />
          </ListItemIcon>
          <ListItemText primary={"Skalpelator"} />
        </ListItem>) : ""}

        {pageValue > -1 ? (
          <div>
            <ListItem
              button
              key={"profile"}
              onClick={() => {
                menuRoute("profile");
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Profil"} />
            </ListItem>
            <ListItem
              button
              key={"cards"}
              onClick={() => {
                menuRoute("cards");
              }}
            >
              <ListItemIcon>
                <ViewCarouselIcon />
              </ListItemIcon>
              <ListItemText primary={"Karty"} />
            </ListItem>
            <ListItem
              button
              key={"wishlist"}
              onClick={() => {
                menuRoute("wishlist");
              }}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"Lista życzeń"} />
            </ListItem>
          </div>
        ) : (
          ""
        )}
      </List>

      {showFilter ? (
        <div>
          <Divider />
          <List>
            <ListItem button key={"filter"} onClick={handleToggleFilter}>
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText primary={"Filtry kart"} />
            </ListItem>
          </List>
        </div>
      ) : (
        ""
      )}

      <Divider />
      <List>
        <ListItem button key={"settings"} onClick={() => setOpenSettings(true)}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Ustawienia"} />
        </ListItem>
      </List>
    </div>
  );

  const onKeyPress = (key) => {
    // enter
    if (key === 13) {
      handleChangeSettings();
    }
    // esc
    if (key === 27) {
      setOpenSettings(false);
    }
  };

  const errorSettings =
    cardOnPage < 100 || cardOnPage > 4000 || openSnackbarError === true;

  const dialogSettings = () => (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={openSettings}
      onClose={() => setOpenSettings(false)}
      onKeyDown={(e) => onKeyPress(e.keyCode)}
    >
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
                onChange={(event) => setCardOnPage(event.target.value)}
                inputProps={{
                  step: 10,
                  min: 100,
                  max: 4000,
                  type: "number",
                  "aria-labelledby": "input-slider",
                }}
              />
              <FormHelperText component="p" variant="standard">
                Kart nie może być mniej niż 100 <br />
                oraz więcej niż 4000.
              </FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel component="legend">Styl listy kart</FormLabel>
              <RadioGroup
                aria-label="style"
                name="style"
                value={cardsStyle}
                onChange={(event) => setCardsStyle(event.target.value)}
              >
                <FormControlLabel
                  value={"cards"}
                  control={<Radio />}
                  label="Karty"
                />
                <FormControlLabel
                  value={"list"}
                  control={<Radio />}
                  label="Lista"
                />
                <FormControlLabel
                  value={"small"}
                  control={<Radio />}
                  label="Małe karty"
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenSettings(false)}
            color="primary"
            disabled={loading}
          >
            Anuluj
          </Button>

          <Button
            onClick={() => handleChangeSettings()}
            color="primary"
            disabled={loading}
          >
            Zatwierdź
          </Button>
          {loading && (
            <CircularProgress size={44} className={classes.buttonProgress} />
          )}
        </DialogActions>
      </div>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnackbarSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbarSuccess} severity="success">
          Poprawnie ustawiono karty na stronie.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarError}
        autoHideDuration={4000}
        onClose={handleCloseSnackbarError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbarError} severity="error">
          Błąd! Nie ustawiono poprawnie kart na stronie.
        </Alert>
      </Snackbar>

      <AppBar
        position="fixed"
        className={bar ? classes.AppBarE : classes.AppBar}
      >
        <Toolbar className={classes.Toolbar}>
          <a href={`#/`} className={classes.logo}>
            <Avatar
              variant="square"
              src={`${process.env.PUBLIC_URL}/Pictures/pwlogo.png`}
            />
          </a>

          
          {pageValue === -1 ? (<a href={`#/cards/unique`} className={classes.icons}>
            <Tooltip title="Unikatowe karty" arrow>
              <DiamondIcon 
                onMouseEnter={() => setIsIconUHovered(true)} 
                onMouseLeave={() => setIsIconUHovered(false)} 
                style={{transition: 'color 0.3s ease-out', fontSize: "30px", marginTop: "8px", marginRight: "10px", color: isIconUHovered ? "rgb(245, 0, 87)" : "WHITE"}} />
            </Tooltip>
          </a>) : ""}
          {pageValue === -1 ? (<a href={`https://wiki.sanakan.pl/`} target="_blank" className={classes.icons}>
            <Tooltip title="Wiki Pocket Waifu" arrow>
              <ImportContactsIcon 
                onMouseEnter={() => setIsIconWHovered(true)} 
                onMouseLeave={() => setIsIconWHovered(false)} 
                style={{transition: 'color 0.3s ease-out', fontSize: "30px", marginTop: "6px", marginRight: "10px", color: isIconWHovered ? "rgb(245, 0, 87)" : "WHITE"}} />
            </Tooltip>
          </a>) : ""}
          {pageValue === -1 ? (<a href={`https://skalpel.sanakan.pl/`} target="_blank" className={classes.icons}>
            <Tooltip title="Skalpelator - edytuj obrazek pod swój skalepl" arrow>
              <CompareIcon 
                onMouseEnter={() => setIsIconSHovered(true)} 
                onMouseLeave={() => setIsIconSHovered(false)} 
                style={{transition: 'color 0.3s ease-out', fontSize: "30px", marginTop: "8px", marginRight: "10px", color: isIconSHovered ? "rgb(245, 0, 87)" : "WHITE"}} />
            </Tooltip>
          </a>) : ""}

          <div className={classes.a}>
            {pageValue > -1 ? (
              <BottomNavigation
                value={pageValue}
                showLabels
                className={classes.b}
              >
                <BottomNavigationAction
                  label="Profil"
                  icon={<AccountCircleIcon />}
                  href={`#/user/${userID}/profile`}
                  style={{
                    color:
                      pageValue === 0
                        ? changeUserColor(
                            pageValue,
                            profileData
                              ? profileData.foregroundColor
                              : undefined
                          )
                        : "",
                  }}
                />
                <BottomNavigationAction
                  label="Karty"
                  icon={<ViewCarouselIcon />}
                  href={`#/user/${userID}/cards`}
                  style={{
                    color:
                      pageValue === 1
                        ? changeUserColor(
                            pageValue,
                            profileData
                              ? profileData.foregroundColor
                              : undefined
                          )
                        : "",
                  }}
                />
                <BottomNavigationAction
                  className={classes.c}
                  label="Lista życzeń"
                  icon={<FavoriteIcon />}
                  href={`#/user/${userID}/wishlist`}
                  style={{
                    color:
                      pageValue === 2
                        ? changeUserColor(
                            pageValue,
                            profileData
                              ? profileData.foregroundColor
                              : undefined
                          )
                        : "",
                  }}
                />
              </BottomNavigation>
            ) : (
              ""
            )}
          </div>

          {pageValue == -3 ? "" : (<BottomNavigation
            value={0}
            showLabels
            className={showFilter ? classes.filter : classes.filterHidden}
            onClick={handleClickOpenCardStats}
          >
            <BottomNavigationAction
              label="Statystyki"
              icon={<BarChartIcon />}
            />
          </BottomNavigation>)}

          <BottomNavigation
            value={0}
            showLabels
            className={showFilter ? classes.filter : classes.filterHidden}
            onClick={handleToggleFilter}
          >
            <BottomNavigationAction label="Filtry" icon={<FilterListIcon />} />
          </BottomNavigation>

          <Search
            props={props}
            userColor={
              pageValue <= -1
                ? undefined
                : profileData
                ? profileData.foregroundColor
                : undefined
            }
          />

          <Tooltip title="Ustawienia strony" arrow>
            <IconButton
              edge="start"
              className={classes.settingsButton}
              color="inherit"
              aria-label="open settings"
              onClick={() => setOpenSettings(true)}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <IconButton
            edge="menu"
            className={classes.menuButton}
            size="large"
            color="inherit"
            aria-label="open menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="inherit" />
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
        {openFilter ? (
          <Filter
            props={props}
            profileData={profileData}
            cardsData={cardsData}
          ></Filter>
        ) : (
          ""
        )}
      </AppBar>

      {dialogSettings()}
      {showFilter && openCardStats ? (
        <CardStats
          {...props}
          openCardStats={openCardStats}
          handleCloseCardStats={handleCloseCardStats}
          cardsData={cardsData}
          profileData={profileData}
        />
      ) : (
        ""
      )}
    </div>
  );
}
