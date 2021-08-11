import React from "react";
import { useTheme } from "@material-ui/styles";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import { PostActionProps } from "./interfaces";

export default function PostAction(props: PostActionProps) {
  const theme = useTheme<any>();
  const Icon = props.icon;
  return (
    <React.Fragment>
      <Hidden xsDown>
        <Button
          style={{
            color: props.active
              ? theme.palette.secondary.dark
              : theme.palette.primary.contrastText,
            minWidth: "20%",
          }}
          color="primary"
          onClick={props.onClick}
        >
          {props.count && props.count}
          <Icon
            style={{
              width: "1.2rem",
              height: "1.2rem",
              margin: theme.spacing(0, 1),
            }}
          />
          {props.label}
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          style={{
            color: props.active
              ? theme.palette.secondary.dark
              : theme.palette.primary.contrastText,
          }}
          onClick={props.onClick}
        >
          <Badge
            badgeContent={props.count && props.count}
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Icon />
          </Badge>
        </IconButton>
      </Hidden>
    </React.Fragment>
  );
}
