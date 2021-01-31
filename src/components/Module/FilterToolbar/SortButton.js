import React from 'react';
import Button from '@material-ui/core/Button';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function SortButton({props, profileData}) {

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const [openSort, setOpenSort] = React.useState(false);
  const anchorRefSort = React.useRef(null);
  const [selectedIndexSort, setSelectedIndexSort] = React.useState(0);

  // const sortList = ["id", "idDes", "name", "nameDes", "rarity", "rarityDes", "title", "titleDes", "health", "healthDes", "atack", "atackDes", "defence"];
  const sortList = ["id", "name", "rarity", "title", "health", "atack", "defence"];

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

  return (
    <>
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
    </>
  );
}