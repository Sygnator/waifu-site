import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PlayCircleFilledWhite } from '@material-ui/icons';
// import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from "./Module/BackToTop";
import axios from "axios";

import {
    CircularProgress,
  } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    maxWidth: 960,
    minWidth: 370,
    marginLeft: "auto",
    marginRight: "auto",
  },
  textColor: {
    color: "#ffffff",
  },
  wl: {
    fontSize: "30px",
    color: "#ffffff",
  },
  blankWl: {
    textAlign: "center",
    fontSize: "30px",
    color: "#ffffff",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function type(cardType) {
    if(cardType==="title") return "Tytuł";
    if(cardType==="character") return "Postać";
    if(cardType==="card") return "Karta";
    return "Inny";
  }

export default function BasicTable(props) {
  const { match, history } = props;
  const { params } = match;
  const { userID } = params;

  const classes = useStyles();

  const [status, setStatus] = useState();
  const [wlList, setWlList] = useState();

    useEffect(()=> {
        axios.get(`https://api.sanakan.pl/api/waifu/user/shinden/${userID}/wishlist/raw`).then((res)=> {
            const newWlList = res.data;
            if(res.data.length) {
                setWlList(newWlList);
                setStatus(res.status);
            } else {
                setWlList(newWlList);
                setStatus(-1);
            }
            console.log(res.data.length);
            
        }).catch((err)=>{
            setStatus(err.response.status);
        })
    }, [])

  return (
    <>
    <Toolbar {...props} />
    {status===200 ? (
    <TableContainer className={classes.table}>
      <Table aria-label="simple table">
        <TableHead>
        <div className={classes.wl} >Lista życzeń:</div>
          <TableRow >
            <TableCell className={classes.textColor} >Nazwa Postaci</TableCell>
            <TableCell className={classes.textColor} align="right">Typ</TableCell>
            <TableCell className={classes.textColor} align="right">ID Postaci</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {wlList.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={classes.textColor} component="th" scope="row">
              <a href={`https://shinden.pl/character/${row.objectId}`} target="_blank" className={classes.textColor}>
                  {row.objectName}
                </a>
              </TableCell>
              <TableCell className={classes.textColor}  align="right">{type(row.type)}</TableCell>
              <TableCell className={classes.textColor}  align="right">{row.objectId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    ) : (
        status===401 ? <p className={classes.blankWl}>Lista życzeń jest prywatna.</p> : 
        status===-1 ? <p className={classes.blankWl}>Nie odnaleziono listy życzeń użytkownika.</p> :
        <center><CircularProgress size={100}/></center>
    )}
    </>
  );
}
