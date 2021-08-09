import React from "react";
import { Theme } from "@material-ui/core/styles/createTheme";
import { useTheme } from "@material-ui/core/styles/";

import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";

interface UserButtonProps {
  avatarUrl: string | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 0,
    marginRight: theme.spacing(2),
    border: `solid 2px ${theme.palette.primary.main}`,
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
      title="profil utilisateur"
      classes={{
        root: classes.root,
      }}
    >
      {props.avatarUrl ? (
        <Avatar>
          <img
            src={props.avatarUrl}
            alt="avatar de l'utilisateur"
            className={classes.icon}
          />
        </Avatar>
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
