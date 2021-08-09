import { makeStyles, useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createTheme";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(12, 2, 2),
    maxWidth: "36rem",
    margin: "auto",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
  },
}));

export default function Main(props: any) {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);
  return <main className={classes.root}>{props.children}</main>;
}
