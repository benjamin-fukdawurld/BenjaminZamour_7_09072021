import React from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
}));

export default function Login(props: any) {
  const classes = useStyles();
  return (
    <Typography className={classes.root} variant="h1" component="h2">
      {props.value}
    </Typography>
  );
}
