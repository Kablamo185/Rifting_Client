import React, { useContext, useEffect, useRef } from "react";

//styling
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCameraRotate } from '@fortawesome/free-solid-svg-icons'

//my stuff
import LifeCounter from "./LifeCounter";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "1280px",
    [theme.breakpoints.down("lg")]: {
      width: "950px",
    },
    [theme.breakpoints.down("md")]: {
      width: "720px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "550px",
    },
  },
  myVideo: {
    width: "550px",
    //transform: "rotate(180deg)",
  },
  gridContainer: {
    justifyContent: "center",
    direction: "column",
    [theme.breakpoints.down("xl")]: {
      direction: "column",
    },
  },
  paper: {
    padding: "2px",
    border: "2px solid black",
    margin: "3px",
    backgroundColor: "#23272a",
  },
  text: {
    color: "#99aab5",
  },
  opponent: {
    flexGrow: 1,
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    userVideo,
    callEnded,
    stream,
    setStream,
    call,
    oppName,
    rating,
    oppLifeTotal,
    rotate,
    setRotate,
    oppRotate,
    setOppRotate
  } = useContext(SocketContext);
  const classes = useStyles();

  const myLocalVideo = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myLocalVideo.current.srcObject = currentStream;
      })
  }, [setStream])

  const rotator = rotate ? "rotate(180deg)" : "rotate(0)"
  const oppRotator = oppRotate ? "rotate(180deg)" : "rotate(0)"

   const handleRotate = () => {
     setRotate(!rotate)
   }

   const handleOppRotate = () => {
    setOppRotate(!oppRotate)
  }

  return (
    <Grid container xl={1} className={classes.gridContainer}>
      {/* Opponent Video */}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={12}>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
              style={{ transform: oppRotator}}
            />
            <Typography className={classes.text} variant="h5" gutterBottom>
              <Grid
                direction="row"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  className={classes.opponent}
                  variant="h5"
                  gutterBottom
                >
                  {oppLifeTotal}
                </Typography>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  {call.name || oppName}
                </Typography>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  (1500)
                </Typography>
                <Button
                  className="control__btn"
                  shape="round"
                  onClick={handleOppRotate}
                  variant="contained"
                  color="primary"
                  style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                  >
                  <FontAwesomeIcon icon={faCameraRotate} size="lg"/>
                </Button>
              </Grid>
            </Typography>
          </Grid>
        </Paper>
      )}
      {/* Our Video */}
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={12}>
              <Grid
                direction="row"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <LifeCounter key="1" />
                <Typography className={classes.text} variant="h5" gutterBottom>
                  {name || "Name"}{" "}
                </Typography>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  ({rating || "N/A"})
                </Typography>
                <Button
                  className="control__btn"
                  shape="round"
                  onClick={handleRotate}
                  variant="contained"
                  color="primary"
                  style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                  >
                  <FontAwesomeIcon icon={faCameraRotate} size="lg"/>
                </Button>
              </Grid>
            <video
              playsInline
              muted
              ref={myLocalVideo}
              autoPlay
              style={{ transform: rotator}}
              className={classes.myVideo}
            />
            
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
