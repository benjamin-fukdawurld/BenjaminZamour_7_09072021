import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import UserArea from "./UserArea";
import Logo from "./Logo";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../../Context";
import ContextManager from "../../ContextManager";

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
        <Context.Consumer>
          {(context: ContextManager) => {
            return <UserArea user={context.user} />;
          }}
        </Context.Consumer>
      </Toolbar>
    </AppBar>
  );
}
