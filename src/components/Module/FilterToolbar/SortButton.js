import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import useFilterData from "./../../filterHook";

export default function SplitButton({props, profileData}) {

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // const sortList = ["id", "idDes", "name", "nameDes", "rarity", "rarityDes", "title", "titleDes", "health", "healthDes", "atack", "atackDes", "defence"];
  const sortList = ["id", "name", "rarity", "title", "health", "atack", "defence"];

  const [options, setOptions] = React.useState(sortList.map((o)=>{
    return {value: o, choice: null}
  }));

  const [filterData, setFilterData] = useFilterData();

  const [up, setUp] = React.useState(false);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const changeTag = (choice) => {
    switch (choice) {
      case null:
      case "reject":
        return "assign";
      case "assign":
        return "reject";
    
      default:
        return null;
    }
    // if (index===selectedIndex) {
    //   if (option.choice===null) return {value: option.value, choice: "assign"}
    //   if (option.choice==="assign") return {value: option.value, choice: "reject"}
    //   if (option.choice==="reject") return {value: option.value, choice: "assign"}
    // } else {
    //   if (option.choice===null) return {value: option.value, choice: "assign"}
    //   if (option.choice==="assign") return {value: option.value, choice: "reject"}
    //   if (option.choice==="reject") return {value: option.value, choice: null}
    // }
    // return {value: option.value, choice: null}
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);

    for (let i = 0; i < options.length; i++) {
      const element = options[i];
      if (i===index) {
        options[i].choice = changeTag(element.choice);
        continue;
      }
      options[i].choice = null;
    }

    // setOpen(false);
    setUp(!up);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const getStyles = (option) => {
    if(option.choice===null) return
    if(option.choice==="assign") return {color: "green"}
    if(option.choice==="reject") return {color: "red"}
  };

  return (
    <>
    {/* <Grid container direction="column" alignItems="center">
    <Grid item xs={12}> */}
        {/* <ButtonGroup variant="contained" color="primary"  aria-label="split button"> */}
          <Button
            ref={anchorRef}
            variant="contained"
            color="primary"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            Sortuj<ArrowDropDownIcon />
          </Button>
        {/* </ButtonGroup> */}
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option.value}
                        // disabled={index === 2}
                        selected={false}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        style={getStyles(option)}
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
    {/* </Grid>
    </Grid> */}
    </>
  );
}