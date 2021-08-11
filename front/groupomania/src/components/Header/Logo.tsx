import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Icon } from "../common/Icons";
import { Hidden, IconButton } from "@material-ui/core";
import { theme } from "../../Theme";

export default function Logo(props: any) {
  return (
    <Link to="/" title="accueil" style={{ flexGrow: 1 }}>
      <Hidden smDown>
        <Button
          style={{
            color: theme.palette.primary.main,
            fontFamily: "'Lato', sans-serif",
            textTransform: "capitalize",
            fontSize: "3.5rem",
            borderRadius: "16px",
            padding: "0.5rem",
            height: "4.8rem",
          }}
          disableRipple
        >
          <Icon style={{ height: "4rem" }} />
          Groupomania
        </Button>
      </Hidden>
      <Hidden mdUp>
        <IconButton
          style={{
            color: theme.palette.primary.main,
            padding: 0,
          }}
          disableRipple
        >
          <Icon style={{ height: "4rem" }} />
        </IconButton>
      </Hidden>
    </Link>
  );
}
