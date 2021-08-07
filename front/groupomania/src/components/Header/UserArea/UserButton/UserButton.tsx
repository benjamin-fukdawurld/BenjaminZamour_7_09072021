import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import { getAuthData } from "../../../../common/auth";
import Avatar from "@material-ui/core/Avatar";
import { theme } from "../../../../Theme";

export default function UserButton(props: any) {
  const authData = getAuthData();
  return (
    <IconButton
      onClick={() => {
        window.location.href = "/user";
      }}
      color="primary"
      title="profil utilisateur"
      style={{
        padding: 0,
        marginRight: theme.spacing(2),
        border: `solid 2px ${theme.palette.primary.main}`,
      }}
    >
      <Avatar>
        {authData?.authenticated ? (
          <img
            src={authData.avatarUrl}
            alt="avatar de l'utilisateur"
            style={{ height: "3rem", width: "3rem" }}
          />
        ) : (
          <PersonIcon style={{ height: "3rem", width: "3rem" }} />
        )}
      </Avatar>
    </IconButton>
  );
}
