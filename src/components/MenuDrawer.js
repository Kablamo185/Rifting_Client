import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
} from "@material-ui/core";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDragon, faBug, faHatWizard } from '@fortawesome/free-solid-svg-icons'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#99aab5",
  },
  drawer: {
    background: "#2c2f33",
  },
  largeIcon: {
    "& svg": {
      fontSize: 45,
    },
    color: "#99aab5",
  },
}));

const TemporaryDrawer = () => {
  const [state, setState] = useState({
    right: false,
  });
  const classes = useStyles();
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="FAB" className={classes.text}>
          <ListItemText primary="Flesh and Blood" />
        </ListItem>
        <ListItem
          button
          key="classic"
          className={classes.text}
          onClick={() => navigate("/")}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faDragon} className={classes.text}/>
          </ListItemIcon>
          <ListItemText
            primary="Classic Constructed"
            className={classes.text}
          />
        </ListItem>
        <ListItem
          button
          key="blitz"
          className={classes.text}
          onClick={() => navigate("/blitz")}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faHatWizard} className={classes.text}/>
          </ListItemIcon>
          <ListItemText primary="Blitz" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          key="contact"
          className={classes.text}
          onClick={() => navigate("/contact")}
        >
          <ListItemIcon>
          <FontAwesomeIcon icon={faBug} className={classes.text}/>
          </ListItemIcon>
          <ListItemText primary="Report Bugs" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button
          onClick={toggleDrawer("right", true)}
          className={classes.largeIcon}
        >
          <MenuOutlinedIcon />
        </Button>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
          classes={{ paper: classes.drawer }}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default TemporaryDrawer;
