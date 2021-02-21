import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Toolbar from "./Module/ToolbarS";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Toolbar from "./Module/Toolbar";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 65,
    },
    list: {
      paddingLeft: "10px",
      width: '100%',
      maxWidth: 500,
      color: "white",  
    },
    // avatar: {
    //     border: "2px solid white",
    //     borderRadius: "50%",
    //   },
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

const Main = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [lastVisited, setLastVisited] = useState();
    const [test, setTest] = useState();

    useEffect(() => {
        setLastVisited(JSON.parse(localStorage.getItem(`lastVisited`)))
      }, []);

    //   window.location.href=`#/user/${test}/profile`;
    // window.location.reload();

    return (
        <>
            <Toolbar  props={props} pageValue={-1} />

            <div className={classes.root}>
            {lastVisited ? (
                <List dense className={classes.list}>
                <div className={classes.divWhite}>Lista ostatnio odwiedzanych profili: </div>
                {lastVisited.map((value) => {
                  if(value!==null) {
                    return (
                        <a className={classes.test}  href={`#/user/${value.id}/profile`}>
                        <ListItem key={value.name} button>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar ${value.id}`}
                              src={value.avatarUrl}
                            //   className={classes.avatar}
                            />
                          </ListItemAvatar>
                          <ListItemText className={classes.secondary} id={value.id} primary={value.name}/>
                        </ListItem>
                        </a>
                      );
                  }
                  return ""
                })}
                <div>Funkcja w trakcje produkcji... </div>
              </List>
             
            ) : (
                <div className={classes.divWhite}>Nikogo ostatnio nie odwiedzałeś...</div>
            )}
          </div>
        </>
    )
}

export default Main;