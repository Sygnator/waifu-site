import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import { fade, makeStyles } from '@material-ui/core/styles';

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
}));

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
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
    
        console.log(data);
    
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
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={options}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => {return option.name}}
      renderOption={(option, { selected }) => (
        <span className={classes.root}>
        <a href={`#/user/${option.id}/profile`} className={classes.text}>
          <img src={option.avatarUrl} alt={option.id} className={classes.img}/>
            </a>
            <a href={`#/user/${option.id}/profile`} className={classes.name} >{option.name}</a>
            {/* <a className={classes.rank} >{option.rank}</a> */}
          {/* <div className={classes.name} >{option.name}</div>
          <div className={classes.rank} >{option.rank}</div> */}
        </span>
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
