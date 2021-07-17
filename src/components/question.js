import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from "@material-ui/core/styles";

import CryptoJS from "crypto-js";

import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

import { withStyles } from '@material-ui/core/styles';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    TextField,
    Button,
    Grid,
    Switch,
    BottomNavigation,
    BottomNavigationAction,
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Input,
    FormControl,
    FormHelperText,
    FormLabel,
    Tooltip,
    CircularProgress,
    Snackbar,
    Avatar,
    Radio,
    RadioGroup,
    FormControlLabel,
  } from '@material-ui/core';

import emoji from "./emoji.js";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto+10px",
    color: "#c1c1c1"
  },
  c1: {
    fontSize: "38px",
    color: "#c1c1c1"
  },
  c3: {
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
      minWidth: "400px",
      minHeight: "56px",
      backgroundColor: "#373c46",
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
  c4: {
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
      width: "80px",
      height: "56px",
      backgroundColor: "#373c46",
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
  c5: {
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
      minWidth: "500px",
      minHeight: "600px",
      backgroundColor: "#373c46",
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
  iconB: {
    color: '#c1c1c1!important',
  },
}));

const Test = (props) => {

    // const { match, history } = props;
    // const { params } = match;
    // const { userID } = params;

    const classes = useStyles();

    // straszna prowizorka, ale tak to jest jak trzeba coś zrobić w 1h

      const [q, setQ] = useState("")

      const [a1, setA1] = useState(true)
      const [a2, setA2] = useState(false)
      const [a3, setA3] = useState(false)
      const [a4, setA4] = useState(false)
      const [a5, setA5] = useState(false)
      const [a6, setA6] = useState(false)
      const [a7, setA7] = useState(false)
      const [a8, setA8] = useState(false)
      const [a9, setA9] = useState(false)
      const [a10, setA10] = useState(false)

      const [a1a, setA1a] = useState('')
      const [a2a, setA2a] = useState('')
      const [a3a, setA3a] = useState('')
      const [a4a, setA4a] = useState('')
      const [a5a, setA5a] = useState('')
      const [a6a, setA6a] = useState('')
      const [a7a, setA7a] = useState('')
      const [a8a, setA8a] = useState('')
      const [a9a, setA9a] = useState('')
      const [a10a, setA10a] = useState('')

      const [genJson, setGenJson] = useState("Tutaj pojawi się JSON")

    const addAnswer = () => {

        const answer1 = a1a == '' ? null : `
        {
            "id": 0,
            "number": 1,
            "content": "${a1a}",
            "questionId": 0
        }${a2 ? ',' : ''}`
        const answer2 = a2a == '' ? null : `
        {
            "id": 0,
            "number": 2,
            "content": "${a2a}",
            "questionId": 0
        }${a3 ? ',' : ''}`
        const answer3 = a3a == '' ? null : `
        {
            "id": 0,
            "number": 3,
            "content": "${a3a}",
            "questionId": 0
        }${a4 ? ',' : ''}`
        const answer4 = a4a == '' ? null : `
        {
            "id": 0,
            "number": 4,
            "content": "${a4a}",
            "questionId": 0
        }${a5 ? ',' : ''}`
        const answer5 = a5a == '' ? null : `
        {
            "id": 0,
            "number": 5,
            "content": "${a5a}",
            "questionId": 0
        }${a6 ? ',' : ''}`
        const answer6 = a6a == '' ? null : `
        {
            "id": 0,
            "number": 6,
            "content": "${a6a}",
            "questionId": 0
        }${a7 ? ',' : ''}`
        const answer7 = a7a == '' ? null : `
        {
            "id": 0,
            "number": 7,
            "content": "${a7a}",
            "questionId": 0
        }${a8 ? ',' : ''}`
        const answer8 = a8a == '' ? null : `
        {
            "id": 0,
            "number": 8,
            "content": "${a8a}",
            "questionId": 0
        }${a9 ? ',' : ''}`
        const answer9 = a9a == '' ? null : `
        {
            "id": 0,
            "number": 9,
            "content": "${a9a}",
            "questionId": 0
        }${a10 ? ',' : ''}`
        const answer10 = a10a == '' ? null : `
        {
            "id": 0,
            "number": 10,
            "content": "${a10a}",
            "questionId": 0
        }`

        setGenJson(`{
    "id": 0,
    "group": 1,
    "answer": ${a1 ? 1 : a2 ? 2 : a3 ? 3 : a4 ? 4 : a5 ? 5 : a6 ? 6 : a7 ? 7 : a8 ? 8 : a9 ? 9 : a10 ? 10 : 0},
    "pointsWin": 1,
    "pointsLose": 0,
    "content": "${q}",
    "timeToAnswer": 30,
    "answers": [${answer1 ? answer1 : ''}${answer2 ? answer2 : ''}${answer3 ? answer3 : ''}${answer4 ? answer4 : ''}${answer5 ? answer5 : ''}${answer6 ? answer6 : ''}${answer7 ? answer7 : ''}${answer8 ? answer8 : ''}${answer9 ? answer9 : ''}${answer10 ? answer10 : ''}
    ]
}`)

    }

    const copyJSON = () => {
        const jsonA = genJson;
        navigator.clipboard.writeText(jsonA)
      }


    return (
      <>
          <Typography component="div" className={classes.root}>
            <div className={classes.c1}>Generator JSON do zagadek sanakana</div>
            <Grid container spacing={0}>
            <Grid item xs={6}>
            <TextField
                className={classes.c3}
                id="question"
                label="Wpisz pytanie:"
                multiline
                defaultValue={q}
                onChange={(event)=>setQ(event.target.value)}
                variant="filled"
            />
            {/* <Tooltip title={`Poprawna odpoweidź:`} arrow>
                <TextField
                    className={classes.c4}
                    id="correctAnswer"
                    type="number"
                    // label="Poprawna odpowiedź:"
                    // multiline
                    defaultValue={c}
                    onChange={(event)=>setC(event.target.value)}
                    variant="filled"
                    inputProps={{
                        step: 1,
                        min: 1,
                        max: 10,
                      }}
                />
            </Tooltip> */}
            <Tooltip title={`Zatwierdź`} arrow>
            <IconButton aria-label="addAnswer" className={classes.margin}>
              <DoneIcon
                fontSize="large"
                color="secondary"
                className={classes.iconB}
                onClick={()=>addAnswer()}
              />
            </IconButton>
            </Tooltip>
            <br />
                  <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a1}
                    disabled={a2||a3||a4||a5||a6||a7||a8||a9||a10}
                    onChange={()=>setA1(!a1)}
                    name="answer1"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 1:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA1a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a2}
                    disabled={a1||a3||a4||a5||a6||a7||a8||a9||a10}
                    onChange={()=>setA2(!a2)}
                    name="answer2"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 2:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA2a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a3}
                    disabled={a1||a2||a4||a5||a6||a7||a8||a9||a10}
                    onChange={()=>setA3(!a3)}
                    name="answer3"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 3:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA3a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a4}
                    disabled={a1||a3||a2||a5||a6||a7||a8||a9||a10}
                    onChange={()=>setA4(!a4)}
                    name="answer4"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 4:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA4a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a5}
                    disabled={a1||a3||a4||a2||a6||a7||a8||a9||a10}
                    onChange={()=>setA5(!a5)}
                    name="answer5"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 5:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA5a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a6}
                    disabled={a1||a3||a4||a5||a2||a7||a8||a9||a10}
                    onChange={()=>setA6(!a6)}
                    name="answer6"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 6:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA6a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a7}
                    disabled={a1||a3||a4||a5||a6||a2||a8||a9||a10}
                    onChange={()=>setA7(!a7)}
                    name="answer7"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 7:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA7a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a8}
                    disabled={a1||a3||a4||a5||a6||a7||a2||a9||a10}
                    onChange={()=>setA8(!a8)}
                    name="answer8"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 8:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA8a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a9}
                    disabled={a1||a3||a4||a5||a6||a7||a8||a2||a10}
                    onChange={()=>setA9(!a9)}
                    name="answer9"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 9:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA9a(event.target.value)}
                    variant="filled"
                  />
                <br />
                <Switch
                    defaultChecked
                    color="default"
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                    checked={a10}
                    disabled={a1||a3||a4||a5||a6||a7||a8||a9||a2}
                    onChange={()=>setA10(!a10)}
                    name="answer10"
                  />
                  <TextField
                    className={classes.c3}
                    id="question"
                    label="Wpisz odpowiedź 10:"
                    multiline
                    defaultValue=""
                    onChange={(event)=>setA10a(event.target.value)}
                    variant="filled"
                  />
                <br />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.c5}
                        id="jsonA"
                        // label="Wpisz odpowiedź 10:"
                        disabled={true}
                        multiline
                        defaultValue={"Tutaj pojawi się JSON"}
                        value={genJson}
                        variant="filled"
                    />
                    <Tooltip title={`Kopiuj`} arrow>
                    <IconButton aria-label="copy" className={classes.margin}>
                    <FileCopyIcon
                        fontSize="large"
                        color="secondary"
                        className={classes.iconB}
                        onClick={()=>copyJSON()}
                    />
                    </IconButton>
                    </Tooltip>
                </Grid>
                </Grid>
          </Typography>
      </>
    )
}

export default Test;