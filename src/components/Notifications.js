import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
align: {
  marginLeft: 70,
}
}));


const Notifications = () => {
  const { answerCall, call, callAccepted, queueUI } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <>
      {call.isReceivedCall && !callAccepted && !queueUI && (
        <div className={classes.align} style={{ display: "flex", justifyContent: "left" }}>
          <Typography variant="h5" gutterBottom>{call.name} is calling:</Typography>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;
