import React, { useContext } from "react";

import { Button, Grid, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
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
    width: "275px",
    margin: "25px 0",
    padding: 0,
  },
  margin: {
    marginTop: 10,
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

const BlitzQueue = ({ children }) => {
  const { me, queueBlitz, checkServerQueue, setLifeTotal } =
    useContext(SocketContext);
  const classes = useStyles();

  const queueBltz = () => {
    queueBlitz(me);
    setLifeTotal(20);
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
                startIcon={<FontAwesomeIcon icon={faHatWizard}/>}
                onClick={queueBltz}
                className={classes.margin}
              >
                QUEUE BLITZ
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

export default BlitzQueue;
