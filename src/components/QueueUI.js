import React, { useContext } from "react";
import ReactDom from "react-dom";

import { Button, Grid, Typography, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faGamepad } from '@fortawesome/free-solid-svg-icons'

import { SocketContext } from "../SocketContext";

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
    backgroundColor: "rgba(0,0,0,.7)",
    zIndex: 1000,
  },
  gridContainer: {
    //width: "100%",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
    width: "600px",
    height: "200px",
  },
  container: {
    width: "500px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
    color: "white",
  },
  margin: {
    marginTop: 20,
    marginLeft: 120,
  },
  padding: {
    padding: 10,
  },
  text: {
    marginLeft: 70,
    color: "white",
  },
  paper: {
    marginTop: 300,
    padding: "10px 20px",
    border: "2px solid black",
    backgroundColor: "#23272a",
  },
}));

const QueueUI = () => {
  const { callAccepted, answerCall, call, leaveQueue } =
    useContext(SocketContext);
  const classes = useStyles();

  return ReactDom.createPortal(
    <div className={classes.root}>
      <Container className={classes.container}>
        <Paper elevation={20} className={classes.paper}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={12} className={classes.padding}>
              <Typography
                noWrap
                className={classes.text}
                gutterBottom
                variant="h5"
              >
                You're now in the Queue!
              </Typography>
              <Typography gutterBottom className={classes.text} variant="h6">
                A match will be found shortly.
              </Typography>
              {call.isReceivedCall && !callAccepted ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FontAwesomeIcon icon={faGamepad}/>}
                  size="large"
                  onClick={answerCall}
                  className={classes.margin}
                >
                  Join Game
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faPersonRunning}/>}
                  size="large"
                  onClick={leaveQueue}
                  className={classes.margin}
                >
                  Leave Queue
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>,
    document.getElementById("portal")
  );
};

export default QueueUI;
