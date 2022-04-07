import React, { useContext } from "react";


import { Button, Grid, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon } from '@fortawesome/free-solid-svg-icons'
import "./GlobalStyles.css";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "550px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
    backgroundColor: "#23272a",
  },
  text: {
    color: "#99aab5",
  },
}));

const Options = ({ children }) => {
  const { me, queueCC, checkServerQueue, setLifeTotal } =
    useContext(SocketContext);
  const classes = useStyles();

  const queueClassic = () => {
    queueCC(me);
    setLifeTotal(40);
  };

  //Debug functions
  const checkQueue = () => {
    checkServerQueue();
  };
  const joinNewRoom = () => {
    console.log("hi");
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={12} className={classes.padding}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<FontAwesomeIcon icon={faDragon}/>}
                onClick={queueClassic}
                className={classes.margin}
              >
                QUEUE CC
              </Button>
              {/* <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={checkQueue}
              className={classes.margin}
            >
              DEBUG: CHECK USERS IN QUEUE
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={joinNewRoom}
              className={classes.margin}
            >
              Join Room
            </Button> */}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Options;
