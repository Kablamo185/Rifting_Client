import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Notifications from "./components/Notifications";
import QueueUI from "./components/QueueUI";
import NavBar from "./components/NavBar";

import Classic from "./Classic";
import Blitz from "./Blitz";
import BugReport from "./BugReport";

import { SocketContext } from "./SocketContext";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const App = () => {
  const { queueUI, callAccepted } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.wrapper}>
        {queueUI && !callAccepted && <QueueUI />}
        <NavBar>
          <Notifications />
        </NavBar>
        <Routes>
          <Route exact path="/" element={<Classic />} />
          <Route exact path="/blitz" element={<Blitz />} />
          <Route exact path="/contact" element={<BugReport />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
