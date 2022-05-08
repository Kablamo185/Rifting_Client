import React, { useContext } from "react";
import ReactDom from "react-dom";
import { useNavigate } from "react-router-dom";

import { Button, Grid, Typography, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faGamepad } from '@fortawesome/free-solid-svg-icons'



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,.8)",
    zIndex: 1000,
  },
  gridContainer: {
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "75vh",
    height: "75vh",
  },
  container: {
    width: "75vh",
    height: "75vh",
    margin: "75px 0",
    color: "white",
  },
  padding: {
    padding: 50,
  },
  titleText: {
    color: "white",
    marginRight: 40,
  },
  text: {
    color: "#99aab5",
    marginRight: 40,
  },
  button: {
    marginTop: 40,
    marginLeft: 120,
  },
  paper: {
    border: "2px solid black",
    backgroundColor: "#23272a",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return ReactDom.createPortal(
    <div className={classes.root}>
      <Container className={classes.container}>
        <Paper elevation={20} className={classes.paper}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={12} className={classes.padding}>
              <Typography
                noWrap
                className={classes.titleText}
                gutterBottom
                variant="h4"
              >
                Welcome to Rifting.io
              </Typography>
              <br />
              <Typography gutterBottom className={classes.titleText} variant="h5">
                Rifting is your portal to other worlds.
              </Typography>
              <br />
              <Typography className={classes.text}>
                This is an early access version, as such you may run into several bugs.
              </Typography>
              <br />
              <Typography className={classes.text}>
                It is possible that your connection blocks the webRTC protocol. The best way to test This
                is to create a game with yourself by clicking "copy your ID" and pasting it into the create game field.
                If you can see yourself it means that your connection is fine.
              </Typography>
              <br />
              <Typography className={classes.text}>
                If you cannot see yourself then try disabling your browser extensions OR running your browser 
                in incognito mode OR try using a secondary browser with no extensions installed.
              </Typography>
              <br />
              <Typography className={classes.text}>
                If you get stuck in the queue for an extended period of time. Try leaving the queue and/or refreshing your browser.
              </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faPersonRunning}/>}
                  size="large"
                  onClick={() => navigate("/classic")}
                  className={classes.button}
                >
                  Enter Rifting
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>,
    document.getElementById("portal")
  );
};

export default HomePage;