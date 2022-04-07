import React, { useContext } from "react";

import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Call from "./Call";

import { SocketContext } from "../SocketContext";
import Notifications from "./Notifications";
import MenuDrawer from "./MenuDrawer";

const useStyles = makeStyles((theme) => ({
  appBar: {
    border: "2px solid black",
    zIndex: 1,
    backgroundColor: "#23272a",
    color: "#99aab5",
  },

  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const { users } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="relative" color="inherit">
      <Toolbar>
        <Typography className={classes.title} variant="h2" align="left">
          Rifting
        </Typography>
        <Call>
          <Notifications />
        </Call>
        <Typography variant="h5" align="center">
          users online: {users}
        </Typography>
        <MenuDrawer />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
