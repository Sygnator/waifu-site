import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" style={{color: "#c1c1c1"}}>
      {'Copyright © '}
      <Link style={{color: "#c1c1c1"}} href="https://sanakan.pl/" target="_blank">
        Sanakan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // minHeight: '100vh',
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    color: "#c1c1c1",
    background: "linear-gradient(180deg,rgb(255 255 255 / 2%) 40%,rgb(32 35 42))",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Pocket Waifu</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}