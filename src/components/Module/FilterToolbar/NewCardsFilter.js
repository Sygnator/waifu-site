import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import Button from '@material-ui/core/Button';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

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
  const [searchData, setSearchData] = useState("")

  function inputSearch(searchDataEvent) {
    setSearchData(searchDataEvent);
  }

  // *
  // *
  // * 
  // tag button
  // *
  // *
  // * 

  const [openTag, setOpenTag] = React.useState(false);
  const anchorRefTag = React.useRef(null);

  const [optionsTag, setOptionsTag] = React.useState(profileData.tagList.map((o)=>{
    return {value: o, choice: null}
  }));

  const [upTag, setUpTag] = React.useState(false);

  const changeTag = (option) => {
    if (option.choice===null) return {value: option.value, choice: "assign"}
    if (option.choice==="assign") return {value: option.value, choice: "reject"}
    if (option.choice==="reject") return {value: option.value, choice: null}
    return {value: option.value, choice: null}
  };

  const handleMenuItemClickTag = (event, index) => {
    // setSelectedIndex(index);
    const newOptionTag = changeTag(optionsTag[index])
    optionsTag[index] = newOptionTag;
    // setOpenTag(false);
    setUpTag(!upTag);
  };

  const handleToggleTag = () => {
    setOpenTag((prevOpen) => !prevOpen);
  };

  const handleCloseTag = (event) => {
    if (anchorRefTag.current && anchorRefTag.current.contains(event.target)) {
      return;
    }

    setOpenTag(false);
  };
  const getTagStyles = (option) => {
    if(option.choice===null) return
    if(option.choice==="assign") return {color: "green"}
    if(option.choice==="reject") return {color: "red"}
  };

  // *
  // *
  // * 
  // Sort button 
  // *
  // *
  // * 

  const [openSort, setOpenSort] = React.useState(false);
  const anchorRefSort = React.useRef(null);
  const [selectedIndexSort, setSelectedIndexSort] = React.useState(0);

  const sortList = ["Id", "Nazwa", "Ranga", "Tytuł anime", "Pkt. Zdrowia", "Atak", "Obrona"];

  const [optionsSort, setOptionsSort] = React.useState(sortList.map((o)=>{
    return {value: o, choice: null}
  }));

  const [upSort, setUpSort] = React.useState(false);

  const changeTagSort = (choice) => {
    switch (choice) {
      case null:
      case "reject":
        return "assign";
      case "assign":
        return "reject";
    
      default:
        return null;
    }
  };

  const handleMenuItemClickSort = (event, index) => {
    setSelectedIndexSort(index);

    for (let i = 0; i < optionsSort.length; i++) {
      const element = optionsSort[i];
      if (i===index) {
        optionsSort[i].choice = changeTagSort(element.choice);
        continue;
      }
      optionsSort[i].choice = null;
    }

    // setOpenSort(false);
    setUpSort(!upSort);
  };

  const handleToggleSort = () => {
    setOpenSort((prevOpen) => !prevOpen);
  };

  const handleCloseSort = (event) => {
    if (anchorRefSort.current && anchorRefSort.current.contains(event.target)) {
      return;
    }

    setOpenSort(false);
  };
  const getSortStyles = (option) => {
    if(option.choice===null) return
    if(option.choice==="assign") return {color: "green"}
    if(option.choice==="reject") return {color: "red"}
  };

  // *
  // *
  // * 
  // Other
  // *
  // *
  // * 

  function refreshPage() { 
    console.log(`reload`);
    window.location.reload();
  }

  const clearData = () => {
    setOptionsSort(sortList.map((o)=>{
      return {value: o, choice: null}
    }))

    setSelectedIndexSort(0);

    setOptionsTag(profileData.tagList.map((o)=>{
      return {value: o, choice: null}
    }))

    setSearchData("")

    const filter = {
      orderBy: "id",
      includeTags: [],
      excludeTags: [],
      searchText: null
    };

    const dataFilter = {
      optionsTag: optionsTag,
      optionsSort: optionsSort,
      searchData: searchData,
    }

    localStorage.setItem(`u${userID}filter`, JSON.stringify(filter))
    localStorage.setItem(`u${userID}dataFilter`, JSON.stringify(dataFilter))
    // localStorage.setItem(`u${userID}test`, true)
  };

  const sortBy = (sortOp) => {
  // const sortList = ["id", "idDes", "name", "nameDes", "rarity", "rarityDes", "title", "titleDes", "health", "healthDes", "atack", "atackDes", "defence", "defenceDes"];

    switch (sortOp.value) {
      case "Id":
        if(sortOp.choice==="assign") return "id";
        if(sortOp.choice==="reject") return "idDes";
      case "Nazwa":
        if(sortOp.choice==="assign") return "name";
        if(sortOp.choice==="reject") return "nameDes";
      case "Ranga":
        if(sortOp.choice==="assign") return "rarity";
        if(sortOp.choice==="reject") return "rarityDes";
      case "Tytuł anime":
        if(sortOp.choice==="assign") return "title";
        if(sortOp.choice==="reject") return "titleDes";
      case "Pkt. Zdrowia":
        if(sortOp.choice==="assign") return "health";
        if(sortOp.choice==="reject") return "healthDes";
      case "Atak":
        if(sortOp.choice==="assign") return "atack";
        if(sortOp.choice==="reject") return "atackDes";
      case "Obrona":
        if(sortOp.choice==="assign") return "defence";
        if(sortOp.choice==="reject") return "defenceDes";
      default:
        return "id";
    }
  }

  const apply = () => {
    // sort data
    const orderBy = sortBy(optionsSort[selectedIndexSort]);

    // tag data
    const includeTags = [];

    const excludeTags = [];

    optionsTag.map((e)=>{
      if(e.choice==="assign") includeTags.push(e.value)
      if(e.choice==="reject") excludeTags.push(e.value)
    })

    // input data
    const searchText = searchData;

    const filter = {
      orderBy: orderBy, 
      includeTags: includeTags,
      excludeTags: excludeTags,
      searchText: searchText,
    };

    const dataFilter = {
      optionsTag: optionsTag,
      optionsSort: optionsSort,
      searchData: searchData,
    }

    // console.log("filter", filter);
    localStorage.setItem(`u${userID}filter`, JSON.stringify(filter))
    localStorage.setItem(`u${userID}dataFilter`, JSON.stringify(dataFilter))
    refreshPage()
  }


  useEffect(() => {

  //   const newFilter = JSON.parse(localStorage.getItem(`u${userID}filter`));

  //   if(newFilter!==null) {

  //     const newExcludeTags = newFilter.excludeTags;
  //     const newIncludeTags = newFilter.includeTags;
  //     const newOrderBy = newFilter.orderBy;
  //     const newSearchText = newFilter.searchText;

  //     const newTagOptios = optionsTag.map((tag)=>{
  //       if(newExcludeTags.indexOf(tag.value)>-1) {
  //         return {value: tag.value, choice: "reject"}
  //       }
  //       if(newIncludeTags.indexOf(tag.value)>-1) {
  //         return {value: tag.value, choice: "assign"}
  //       }
  //        return {value: tag.value, choice: null}
  //     });

  //     // setOptionsSort(sortList.map((o)=>{
  //     //   return {value: o, choice: null}
  //     // }))
  
  //     // setSelectedIndexSort(0);
  
  //     setOptionsTag(newTagOptios);
  
  //     setSearchData(newSearchText);

  // }

  const newDataFilter = JSON.parse(localStorage.getItem(`u${userID}dataFilter`));

  if(newDataFilter!==null) {
    setOptionsTag(newDataFilter.optionsTag);
    setOptionsSort(newDataFilter.optionsSort);
    setSearchData(newDataFilter.searchData);
  }

  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar variant='dense' className={classes.barColor}>
            <div className={classes.center}>
            <Button
            ref={anchorRefSort}
            variant="contained"
            color="primary"
            size="small"
            aria-controls={openSort ? 'split-button-menu' : undefined}
            aria-expanded={openSort ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggleSort}
          >
            Sortuj<ArrowDropDownIcon />
          </Button>
        <Popper open={openSort} anchorEl={anchorRefSort.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseSort}>
                  <MenuList id="split-button-menu">
                    {optionsSort.map((option, index) => (
                      <MenuItem
                        key={option.value}
                        // disabled={index === 2}
                        selected={false}
                        onClick={(event) => handleMenuItemClickSort(event, index)}
                        style={getSortStyles(option)}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
              <Button
            ref={anchorRefTag}
            variant="contained"
            color="primary"
            size="small"
            aria-controls={openTag ? 'split-button-menu' : undefined}
            aria-expanded={openTag ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggleTag}
          >
            Tagi<ArrowDropDownIcon />
          </Button>
        <Popper open={openTag} anchorEl={anchorRefTag.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseTag}>
                  <MenuList id="split-button-menu">
                    {optionsTag.map((option, index) => (
                      <MenuItem
                        key={option.value}
                        onClick={(event) => handleMenuItemClickTag(event, index)}
                        style={getTagStyles(option)}
                      >
                        {option.value}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
            </div>
                <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(event) => inputSearch(event.target.value)}
                  value={searchData}
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
                onClick={()=>{apply()}}
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Zastosuj
            </Button>
            <IconButton aria-label="delete" onClick={()=>clearData()} className={classes.delete}>
                <DeleteIcon />
            </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
