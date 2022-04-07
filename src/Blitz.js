import React, { useContext } from "react";

import VideoPlayer from "./components/VideoPlayer";
import BlitzQueue from "./components/BlitzQueue";

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

const Blitz = () => {
  const { callAccepted } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <VideoPlayer />
      {!callAccepted && <BlitzQueue />}
    </div>
  );
};

export default Blitz;
