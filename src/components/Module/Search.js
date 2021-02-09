import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import { fade, makeStyles } from '@material-ui/core/styles';

// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textDecoration: "none",
  },
  img: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    border: "3px solid #3f51b5",
  },
  text: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: "10px",
  },
  name: {
    textDecoration: "none",
    fontSize: "20px",
    color: "black",
    marginLeft: "10px",
  },
  rank: {
    fontSize: "10px",
  },
  list: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function localAdd(selectUser) {
  // console.log(selectUser, "sss");
  // const lastUserList = JSON.parse(localStorage.getItem(`lastUserList`));

  // if (lastUserList===null) {
  //   console.log('x1');
  //   const userList = [];

  //   userList.unshift(selectUser);
  //   for (let index = 0; index < 9; index++) {
  //       userList.push(null);
  //   }

  //   console.log(userList)
  //   localStorage.setItem(`lastUserList`, JSON.stringify(userList));
  // } else {
  //   console.log('x2');
  //   console.log(Date.now());
  //   lastUserList.pop();
  //   lastUserList.unshift(selectUser);
  //   // localStorage.removeItem(`lastUserList`)
  //   localStorage.setItem(`lastUserList`, JSON.stringify(lastUserList));
  // }
  
  // console.log(JSON.parse(localStorage.getItem(`lastUserList`)))
  window.location.href=`#/user/${selectUser.id}/profile`;
  window.location.reload();
}

export default function Asynchronous() {
  const classes = useStyles();

  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (searchData.length>3) {
        (async () => {
    
        const data = await axios({
            method: 'post',
            url: 'https://api.sanakan.pl/api/User/find',
            headers: {"Content-Type": "application/json", "Accept": "*/*"},
            data: JSON.stringify(searchData)
          }).then((res)=> {
              sleep(5000)
              return res.data;
        }) ;
    
        // console.log(data);
    
        setOptions(data)
    
        })();
    } 

    return () => {
      active = false;
    };
  }, [loading, searchData]);

  useEffect(() => {
    if (!open) {
      // setSearchData("")
      setOptions([]);
    }
    setSearchData("")
  }, [open]);

  useEffect(() => {
    setOptions([]);
  }, [searchData]);

  return (
    <Autocomplete
      id="search"
      disabledItemsFocusable={true}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        if(searchData.length>1) setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      selectOnFocus={false}
      getOptionSelected={(option, value) => {
        if(option.name === value.name) {
          console.log(`xxxx`,option);
          localAdd(value)
        }
        return option.name === value.name}}
      getOptionLabel={(option) => {return option.name}}
      renderOption={(option, { selected }) => (
        // <span className={classes.root} >
        // <a  className={classes.text}>
        //   <img src={option.avatarUrl} alt={option.id} className={classes.img}/>
        //     </a>
        //     <a  className={classes.name} >{option.name}</a>
        //     {/* <a className={classes.rank} >{option.rank}</a> */}
        //   {/* <div className={classes.name} >{option.name}</div>
        //   <div className={classes.rank} >{option.rank}</div> */}
        // </span>
        // onClick={localAdd((event)=>event.target.value)} value={option}
              <ListItem key={option.id} >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar ${option.id}`}
                    src={option.avatarUrl}
                  />
                </ListItemAvatar>
                <ListItemText id={option.id} primary={option.name} secondary={option.rank} />
              </ListItem>
      )}
      loading={loading}
      // onInputChange={(event)=>setSearchData(event.target.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Szukaj użytkownika"
          variant="standard"
          onChange={(event)=>setSearchData(event.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
