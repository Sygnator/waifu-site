import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import FilterButton from "./SortButton.js";
import TagsButton from "./TagsButton.js";
import SearchInput from "./SearchCards.js";
import TagsButtonTest from "./TagsButtonTest.js";

import useFilterData from "./../../filterHook";
import useWaifuCardsData from "./../../cardsHook";
import useProfileData from "./../../profileHook";

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
}));

export default function SearchAppBar({props, profileData}) {
  const classes = useStyles();

  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  // const [profilData, setProfilData] = useProfileData(userID);
  // const [waifuCardsData, setWaifuCardsData] = useWaifuCardsData(userID);
  // const [filterData, setFilterData] = useFilterData();

  const filter = {
    orderBy: "id", //id, idDes, name, nameDes, rarity, rarityDes, title, titleDes, health, healthDes, atack, atackDes, defence, defenceDes
    includeTags: [],
    excludeTags: [],
    searchText: null
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar variant='dense' className={classes.barColor}>
            <div className={classes.center}>
              <FilterButton props={props} profileData={profileData} ></FilterButton>
              <TagsButton props={props} profileData={profileData} ></TagsButton>
              {/* <TagsButtonTest props={props} profileData={profileData} ></TagsButtonTest> */}
            </div>
              <SearchInput {...props} ></SearchInput>
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
