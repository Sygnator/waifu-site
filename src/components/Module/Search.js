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
  Input: {
    color: "#fff",
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid rgba(245, 0, 85, .87)",
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiIconButton-root': {
      color: '#fff',
    },
    '& .MuiCircularProgress-root': {
      color: '#fff',
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#f50057',
    },
    '& .MuiInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
    "& .MuiAutocomplete-endAdornment": {
      color: '#fff!important',
    },
  },
  Input2: {
    color: "#fff",
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid rgba(255, 255, 255, 1)",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "1px solid #ffffffbb",
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiInputBase-root': {
      color: '#fff',
    },
    '& .MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiIconButton-root': {
      color: '#fff',
    },
    '& .MuiCircularProgress-root': {
      color: '#fff',
    },
    '& label.Mui-focused': {
      color: '#fff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffffffaa',
    },
    '& .MuiInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#fff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
    "& .MuiAutocomplete-endAdornment": {
      color: '#fff!important',
    },
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
  if(selectUser!==undefined) {
  const lastUserList = JSON.parse(localStorage.getItem(`lastVisited`));

  if (lastUserList===null) {
    const userList = [];

    userList.unshift({...selectUser, pinned: false});
    for (let index = 0; index < 9; index++) {
        userList.push(null);
    }

    localStorage.setItem(`lastVisited`, JSON.stringify(userList));
  } else if (lastUserList[9]===null ? true : lastUserList[9].pinned===false) {
    const userIdList = lastUserList.map((x)=>{
      if (x!==null) {
        return x.id;
      }
      return x;
    })

    if(userIdList.includes(selectUser.id)) {
      if (lastUserList[userIdList.indexOf(selectUser.id)].pinned === true) {
        lastUserList.unshift({...selectUser, pinned: true});
        lastUserList.splice(userIdList.indexOf(selectUser.id)+1, 1);
      } else {
        lastUserList.unshift({...selectUser, pinned: false});
        lastUserList.splice(userIdList.indexOf(selectUser.id)+1, 1);
      }
    } else {
        lastUserList.pop();
        lastUserList.unshift({...selectUser, pinned: false});
      // localStorage.removeItem(`lastVisited`)
    }

    const newListPin = []
    const newListUnPin = []

    lastUserList.map((x)=>{
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

    localStorage.setItem(`lastVisited`, JSON.stringify(newList));
  }

    window.location.href=`#/user/${selectUser.id}/profile`;
    window.location.reload();
  }

}

export default function Asynchronous({props,userColor=false}) {
  // const {userColor} = props;
  const classes = useStyles();

  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const [kayupDelay, setKayupDelay] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const [selected, setSelected] = useState();

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
        });

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

  useEffect(() => {
    localAdd(selected);
  }, [selected]);

  return (
    <Autocomplete
      id="search"
      disabledItemsFocusable={true}
      style={{ width: 300 }}
      open={open}
      disableCloseOnSelect={true}
      onOpen={() => {
        if(searchData.length>1) setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      selectOnFocus={false}
      getOptionSelected={(option, value) => {
        if(option.id === value.id) {
          setSelected(value)
        }
        return option.name === value.name}}
      getOptionLabel={(option) => {return option.name}}
      renderOption={(option, { selected }) => (
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
          onChange={(event)=>{
            if (!kayupDelay) {
              setKayupDelay(true)
              setTimeout(() => {
                setSearchData(event.target.value)
                setKayupDelay(false)
              }, 200);
            }
          }}
          className={userColor ? classes.Input2 : classes.Input}
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
