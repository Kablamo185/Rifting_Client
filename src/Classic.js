import React, { useContext } from "react";

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";

import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";

import { SocketContext } from "./SocketContext";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const Classic = () => {
  const { callAccepted } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <VideoPlayer />
      {!callAccepted && <Options />}
    </div>
  );
};

export default Classic;
