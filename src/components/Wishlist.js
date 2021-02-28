import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Link,
  Container,
  Divider,
  Paper,
  Typography,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "./Module/BackToTop";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 35%",
    backgroundSize: "cover",
    height: "330px",
  },
  shadow: {
    height: "100%",
    background: "linear-gradient(180deg,rgba(32, 35, 42,0) 40%,rgba(32, 35, 42,.6))",
  },
  mainPage: {
    width: "95%",
    minHeight: "200px",
    backgroundColor: "#30333a",
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: "8px",
    marginTop: -30,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "100px",
    paddingTop: 20,
  },
  wishlist_title: {
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 30,
    color: "#c1c1c1",
  },
  wishlist_table_container: {
    padding: 15,
    // hidden table scroll
    overflow: "hidden",
    marginBottom: 50,
    [theme.breakpoints.up('md')]: {
      marginRight: 100,
      marginLeft: 100,
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: 200,
      marginLeft: 200,
    },
  },
  // wishlist_table: {
  //   border: "1px solid #424242",
  // },
  wishlist_table_head: {
    backgroundColor: "#232427",
  },
  wishlist_table_th: {
    textAlign: "center",
    borderBottom: "2px solid #ab003ce8",
    color: "#f50057",
  },
  wishlist_table_td1: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#323438",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  wishlist_table_td2: {
    textAlign: "center",
    color: "#c1c1c1",
    backgroundColor: "#2b2d31",
    borderBottom: "1px solid #1d1f2100",

    "& span": {
      color: "#f50057",
    }
  },
  wishlist_name: {
    textDecoration: "none",
    color: "#c1c1c1",

    "&:hover": {
      color: "#f50057",
    }
  },
  CircularProgress: {
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    color: "#ab003c",
  },
  error404: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    fontSize: 32,
    color: "#c1c1c1",

    "& span": {
      fontSize: 40,
      color: "#ab003c",
    }
  },

}));

function type(cardType) {
  if(cardType==="title") return "Tytuł";
  if(cardType==="character") return "Postać";
  if(cardType==="card") return "Karta";
  return "Inny";
}
function name(type, name, id, classes) {
  if(name==="None") name="????"
  if(type==="title") return <a href={`https://shinden.pl/t/${id}`} target="_blank" className={classes.wishlist_name}>{name}</a>;
  if(type==="character") return <a href={`https://shinden.pl/character/${id}`} target="_blank" className={classes.wishlist_name}>{name}</a>;
  if(type==="card") return name;
  return {name};
}

const Wishlist = (props) => {

    const { match, history } = props;
    const { params } = match;
    const { userID } = params;

    const classes = useStyles();

    const [status, setStatus] = useState();
    const [wlList, setWlList] = useState();
    const [profileData, setProfileData] = useState();

    useEffect(async () => {
      if(profileData===undefined) {
          await axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
              const newProfilData = res.data;
              setProfileData(newProfilData);
          }).catch((error)=>{
            setStatus(404)
          })
      }
    }, []);

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
          }).catch((err)=>{
              setStatus(err.response.status);
          })
      }, [])

      const backgroundImg = (profil) => {
        return (profil===undefined||profil.backgroundImageUrl===null) ?  {backgroundImage: `url(${process.env.PUBLIC_URL}/Pictures/banner.png)`,} :
        {backgroundImage: `url(${profil.backgroundImageUrl})`,}
      }

    return (
      <>
        <Paper className={classes.root} style={backgroundImg(profileData)}>
            <Toolbar props={props} pageValue={2}/>
          <div className={classes.shadow} ></div>
        </Paper>

          <Grid container justify="center" spacing={2} className={classes.mainPage}>
          {status===200 ? (
            <>
            <div className={classes.wishlist_title}>Lista życzeń</div>
            <TableContainer className={classes.wishlist_table_container}>
              <Table className={classes.wishlist_table} aria-label="simple table">
                <TableHead className={classes.wishlist_table_head}>
                  <TableRow >
                    <TableCell className={classes.wishlist_table_th} >Nazwa</TableCell>
                    <TableCell className={classes.wishlist_table_th} align="right">Typ</TableCell>
                    <TableCell className={classes.wishlist_table_th} align="right">ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wlList.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2} component="th" scope="row">
                          {name(row.type, row.objectName, row.objectId, classes)}
                      </TableCell>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2}  align="right">{type(row.type)}</TableCell>
                      <TableCell className={index%2===0 ? classes.wishlist_table_td1 : classes.wishlist_table_td2}  align="right">{row.objectId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
            ) : (
                status===401 ? <p className={classes.error404}><span>401</span><br />Lista życzeń jest prywatna.</p> :
                status===404 ? <p className={classes.error404}><span>404</span><br />Nie odnaleziono profilu użytkownika waifu.</p> :
                status===-1 ? <p className={classes.error404}><span>Error</span><br />Nie odnaleziono listy życzeń użytkownika.</p> :
                <CircularProgress className={classes.CircularProgress} size={100}/>
            )}
          </Grid>
    </>
    )
}

export default Wishlist;