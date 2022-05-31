import React, { useContext, useState } from "react";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faGamepad, faGhost } from '@fortawesome/free-solid-svg-icons'

import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "100%",
    height: "50%",
    containerSpacing: 0.5,
  },
  container: {
    margin: "0px 0px",
    padding: 0,
  },
  margin: {
    marginTop: 10,
  },
  padding: {
    padding: 5,
    marginLeft: 10,
  },
  text: {
    color: "#99aab5",
    marginBottom: -5,
  },
}));

const Call = ({ children }) => {
  const { callAccepted, me, name, setName, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <form noValidate autoComplete="off">
        <Grid container className={classes.gridContainer}>
          <Grid
            className={classes.padding}
            direction="row"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              className={classes.padding}
              direction="column"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography className={classes.text} gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faClone}/>}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              className={classes.padding}
              direction="column"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Typography className={classes.text} gutterBottom variant="h6">
                Challenge Player
              </Typography>
              <TextField
                label="ID to Challenge"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FontAwesomeIcon icon={faGhost}/>}
                  onClick={leaveCall}
                  className={classes.margin}
                >
                  End Game
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FontAwesomeIcon icon={faGamepad}/>}
                  onClick={() => callUser(idToCall)}
                  className={classes.margin}
                >
                  Create Game
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
      {children}
    </Container>
  );
};

export default Call;
