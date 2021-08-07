import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { getAuthData } from "../../common/auth";
import UserArea from "./UserArea";
import Logo from "./Logo";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},

  colorDefault: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(12px)",
  },
}));

export default function Header(props: any) {
  const classes = useStyles();
  return (
    <AppBar classes={classes} color="default">
      <Toolbar>
        <Logo />
        <UserArea authData={getAuthData()} />
      </Toolbar>
    </AppBar>
  );
}
