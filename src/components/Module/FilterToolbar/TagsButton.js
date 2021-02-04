import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function SplitButton({props, profileData}) {

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

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

  return (
    <>
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
    </>
  );
}
