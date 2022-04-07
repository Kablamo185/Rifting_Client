import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";

import { SocketContext } from "../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted, queueUI } = useContext(SocketContext);
  return (
    <>
      {call.isReceivedCall && !callAccepted && !queueUI && (
        <div style={{ display: "flex", justifyContent: "Center" }}>
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
