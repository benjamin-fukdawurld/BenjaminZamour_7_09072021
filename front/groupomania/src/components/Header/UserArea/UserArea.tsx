import React from "react";
import AuthData from "../../../interfaces/AuthData";
import ConnectionLinks from "./ConnectionLinks";
import LogOutButton from "./LogOutButton";
import UserButton from "./UserButton";

interface UserAreaProps {
  authData: AuthData | null;
}

export default function UserArea(props: UserAreaProps) {
  return (
    <div>
      {props.authData?.authenticated ? (
        <div>
          <UserButton />
          <LogOutButton />
        </div>
      ) : (
        <ConnectionLinks />
      )}
    </div>
  );
}
