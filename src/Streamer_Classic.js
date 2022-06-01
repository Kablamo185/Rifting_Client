import React, { useContext } from "react";

import StreamVideoPlayer from "./components/StreamerVideoPlayer";
import Options from "./components/Options";
import StreamLifeTracker from "./components/streamLifeTracker";

import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";

import { SocketContext } from "./SocketContext";
import { LiveHelp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const StreamClassic = () => {
  const { callAccepted } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <StreamLifeTracker/>
      <StreamVideoPlayer />
      {!callAccepted && <Options />}
    </div>
  );
};

export default StreamClassic;