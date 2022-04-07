import React, { useContext } from "react";

//styling
import { Button, Grid, Typography } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown} from '@fortawesome/free-solid-svg-icons'

// my stuff
import { SocketContext } from "../SocketContext";

const LifeCounter = () => {
  const { lifeTotal, setLifeTotal, sendLife } = useContext(SocketContext);

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
        <Typography className="counter__output" style={{color: "#99aab5"}} variant="h4" align="left">
          {lifeTotal}
        </Typography>
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
  );
};

export default LifeCounter;
