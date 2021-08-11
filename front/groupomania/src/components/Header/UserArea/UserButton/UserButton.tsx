import React from "react";
import { Theme } from "@material-ui/core/styles/createTheme";
import { useTheme } from "@material-ui/core/styles/";

import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "../../../common/Avatar";
import { makeStyles } from "@material-ui/core";

interface UserButtonProps {
  avatarUrl: string | null;
  login: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
    marginRight: theme.spacing(2),
  },
  icon: { height: "3rem", width: "3rem" },
}));

export default function UserButton(props: UserButtonProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <IconButton
      onClick={() => {
        window.location.href = "/user";
      }}
      color="primary"
      classes={{
        root: classes.root,
      }}
    >
      {props.avatarUrl ? (
        <Avatar avatarUrl={props.avatarUrl} login={props.login} />
      ) : (
        <PersonIcon
          classes={{
            root: classes.icon,
          }}
        />
      )}
    </IconButton>
  );
}
