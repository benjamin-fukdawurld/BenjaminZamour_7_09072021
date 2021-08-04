import React from "react";
import { LogOutIcon } from "../../../Icons";
import { logOut } from "../../../../common/auth";

export default function LogOutButton(props: any) {
  return (
    <button onClick={logOut} className="ml-1" title="déconnexion">
      <LogOutIcon />
    </button>
  );
}
