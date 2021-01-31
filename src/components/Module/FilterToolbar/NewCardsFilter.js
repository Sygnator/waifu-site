import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import Button from '@material-ui/core/Button';

import FilterButton from "./SortButton.js";
import TagsButton from "./TagsButton.js";
// import SearchInput from "./SearchCards.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  barColor: {
    borderTop: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "#364596",
  },
  button: {
    margin: theme.spacing(1),
  },
  delete: {
    color: "#ffffff",
  },
  left: {
    marginLeft: "auto",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  searchRes: {
    position: 'absolute',
    backgroundColor: "green",
    width: "300px",
    height: "300px"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '220px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    //transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

export default function FilterAppBar({props, profileData}) {
  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  // search  input
  const [searchData, setsearchData] = useState()

  function test(searchData, setsearchData) {
    console.log(`test...- ${searchData}`)
  }

  // tag button

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar variant='dense' className={classes.barColor}>
            <div className={classes.center}>
              <FilterButton props={props} profileData={profileData} ></FilterButton>
              <TagsButton props={props} profileData={profileData} ></TagsButton>
            </div>
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={test({})}
                  placeholder="Szukaj karty"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
                </div>
            <div className={classes.left}>
            <Button
                onClick={()=>console.log(JSON.parse(localStorage.getItem('FData')))}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Zastosuj
            </Button>
            <IconButton aria-label="delete" className={classes.delete}>
                <DeleteIcon />
            </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
