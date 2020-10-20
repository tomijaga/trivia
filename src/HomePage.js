import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "25ch",
    color: "white",
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <>
      <h1>Welcome</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="filled-basic" label="Username" variant="filled" />
      </form>

      <Button
        href="/trivia-game"
        size="large"
        variant="outlined"
        className={classes.root}
        onClick={() => {
          const username = document.querySelector("#filled-basic").value;
          sessionStorage.setItem("username", username);
        }}
      >
        {" "}
        Start
      </Button>
    </>
  );
}
