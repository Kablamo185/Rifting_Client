import React, { useContext } from "react";

import VideoPlayer from "./components/VideoPlayer";
import BlitzQueue from "./components/BlitzQueue";
import StreamLifeTracker from "./components/streamLifeTracker";

import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "./SocketContext";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const StreamBlitz = () => {
  const { callAccepted } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
        <StreamLifeTracker/>
        <VideoPlayer />
        {!callAccepted && <BlitzQueue />}
    </div>
  );
};

export default StreamBlitz;
