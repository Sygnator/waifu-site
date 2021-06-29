import React, { useEffect, useState } from 'react';
import {
  Grid,
  List,
  Paper,
  Avatar,
  Tooltip,
  ListItem,
  IconButton,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import Footer from "./Module/Footer";

import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

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
    minHeight: "200px",
    backgroundColor: "#30333a",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "8px",
    marginTop: -30,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "100px",
    paddingTop: 20,
  },
  list: {
    paddingLeft: "10px",
    width: '100%',
    maxWidth: 500,
    color: "white",
    marginRight: "auto",
  },
  divWhite: {
      color: "white",
      fontSize: "30px",
      paddingLeft: "20px",
      paddingTop: "10px",
  },
  test: {
      textDecoration: "none",
      color: "white",
  }
}));

const MainTest = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [lastVisited, setLastVisited] = useState();

    useEffect(() => {
      setLastVisited(JSON.parse(localStorage.getItem(`lastVisited`)))
    }, []);

    const goToProfile = (id) => {
        window.location.href=`#/user/${id}/profile`;
        window.location.reload();
    }

    const pinProfile = (selectUser, pin) => {
      const newListPin = []
      const newListUnPin = []

      lastVisited.map((x)=>{
        if (x!==null) {
          return x.id===selectUser.id ? {
            id: selectUser.id,
            pinned: pin,
            name: selectUser.name,
            rank: selectUser.rank,
            avatarUrl: selectUser.avatarUrl,
          } : x;
        }
        return x;
      }).map((x)=>{
        if (x!==null) {
          if(x.id===selectUser.id&&x.pinned) {
            return newListPin.unshift(x)
          }
          return x.pinned ? newListPin.push(x) : newListUnPin.push(x)
        }
        return x;
      })

      const newList = [...newListPin, ...newListUnPin]

      for (let index = newList.length; index < 10; index++) {
        newList.push(null);
    }

      setLastVisited(newList)
      localStorage.setItem(`lastVisited`, JSON.stringify(newList));

      console.log(newList);
    }

    return (
      <>
        <Paper className={classes.root}>
            <Toolbar props={props} pageValue={-1}/>
          <div className={classes.shadow} ></div>
        </Paper>

          <Grid container justify="center" spacing={2} className={classes.mainPage}>
            {lastVisited ? (
              <List dense className={classes.list}>
                <div className={classes.divWhite}>Lista ostatnio odwiedzanych profili: </div>
                {lastVisited.map((value) => {
                  if(value!==null) {
                    return (
                        <ListItem key={value.name} button onClick={()=>goToProfile(value.id)}>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar ${value.id}`}
                              src={value.avatarUrl}
                            />
                          </ListItemAvatar>
                          <ListItemText className={classes.secondary} id={value.id} primary={value.name}/>
                          <ListItemSecondaryAction>
                            <Tooltip title={value.pinned ? `Odepnij profil` : `Przypnij profil`} arrow>
                            <IconButton className={classes.test} edge="end" aria-label="comments" onClick={()=>value.pinned ? pinProfile(value, false) : pinProfile(value, true)} style={value.pinned ? {color: "#f50057"} : {}}>
                              <BookmarksIcon />
                            </IconButton>
                            </Tooltip>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                  }
                  return ""
                })}
              </List>
            ) : (
              <div className={classes.divWhite}>Nikogo ostatnio nie odwiedzałeś...</div>
            )}
          </Grid>
      <Footer />
    </>
    )
}

export default MainTest;