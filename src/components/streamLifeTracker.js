import React, { useContext } from "react";

//styling
import { Button, Grid, Typography, Paper } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from "@material-ui/core/styles";

// my stuff
import { SocketContext } from "../SocketContext";

const useStyles = makeStyles((theme) => ({

    paper: {
        padding: "2px",
        border: "2px solid black",
        margin: "3px",
        backgroundColor: "#23272a",
        position: "fixed"
      },

}))

const StreamLifeTracker = () => {
  const { lifeTotal, setLifeTotal, sendLife, oppLifeTotal } = useContext(SocketContext);
  const classes = useStyles();

  const increase = () => {
    sendLife(lifeTotal + 1);
    setLifeTotal(lifeTotal + 1);
    //console.log(lifeTotal);
    // send logic to socket context
  };

  const decrease = () => {
    if (lifeTotal >= 0) {
      sendLife(lifeTotal - 1);
      setLifeTotal(lifeTotal - 1);
      //console.log(lifeTotal);
    } else {
      //Send game loss message
    }
  };

  return (
    <Grid container>
        <Paper className={classes.paper}>
      <Grid
        item
        xs={12}
        md={12}
        direction="column"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Grid
        item
        xs={12}
        md={12}
        direction="row"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Typography className="counter__output" style={{color: "#99aab5"}} variant="h4" align="left">
          {oppLifeTotal}
        </Typography>
        <Typography className="counter__output" style={{color: "#99aab5"}} variant="h6" align="left">
            VS
        </Typography>
        <Typography className="counter__output" style={{color: "#99aab5"}} variant="h4" align="left">
          {lifeTotal}
        </Typography>
        </Grid>
        <Grid
        item
        xs={12}
        md={12}
        direction="row"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Button
          className="control__btn"
          onClick={increase}
          variant="contained"
          color="primary"
          style={{maxWidth: '60px', maxHeight: '40px', minWidth: '60px', minHeight: '40px'}}
        >
          <FontAwesomeIcon icon={faCaretUp}/>
        </Button>
        <Button
          className="control__btn"
          onClick={decrease}
          variant="contained"
          color="primary"
          style={{maxWidth: '60px', maxHeight: '40px', minWidth: '60px', minHeight: '40px'}}
        >
          <FontAwesomeIcon icon={faCaretDown}/>
        </Button>
        </Grid>
      </Grid>
      </Paper>
    </Grid>
  );
};

export default StreamLifeTracker;