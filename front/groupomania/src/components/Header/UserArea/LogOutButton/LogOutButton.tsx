import React from "react";
import { logOut } from "../../../../common/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

export default function LogOutButton(props: any) {
  return (
    <IconButton
      onClick={logOut}
      color="primary"
      title="déconnexion"
      style={{ padding: 0 }}
    >
      <ExitToAppIcon style={{ height: "3rem", width: "3rem" }} />
    </IconButton>
  );
}
