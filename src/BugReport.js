import React, { useContext, useRef } from "react";
import emailjs from '@emailjs/browser';

import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@material-ui/core";

import { SocketContext } from "./SocketContext";



const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: "#99aab5",
  },
  text: {
    color: "#99aab5",
  },
  button: {
    marginTop: "20px"
  },
  card: {
    margin: "20px"
  },
  cardContent: {
    backgroundColor: "#23272a",
    color: "#99aab5",
    padding: "10px",
    border: "2px solid black",
  }
}));

const BugReport = () => {
  const { name, setName, email, setEmail, message, setMessage } = useContext(SocketContext);
  const classes = useStyles();

  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm(
      `${process.env.REACT_APP_SERVICE_ID}`, 
      `${process.env.REACT_APP_TEMPLATE_ID}`, 
      e.target, 
      `${process.env.REACT_APP_EMAIL_KEY}`)
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });

    setEmail('')
    setMessage('')
  }



  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterbottom variant="h4" align="center">Get in touch!</Typography>
          <form ref={form} onSubmit={sendEmail}>
          <Grid container spacing={1}>
            <Grid item >
              <TextField 
                label="Name"
                name="name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }}/>
              <TextField 
                type="email"
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }} />
              <TextField 
                label="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                InputLabelProps={{ className: classes.text }}
                InputProps={{ className: classes.text }} />
              <Button 
                type="submit"
                variant="contained" 
                color="primary"
                fullWidth
                className={classes.button}
                >Submit</Button>
            </Grid>
          </Grid>
          </form>
          <Typography gutterbottom variant="h6" align="center">Alternatively you can email: riftinggame@gmail.com</Typography>
        </CardContent>
      </Card> 
    </div>
  );
};

export default BugReport;
