import React from "react";
import ConnectionLinks from "./ConnectionLinks";
import LogOutButton from "./LogOutButton";
import UserButton from "./UserButton";

import User from "../../../interfaces/User";

interface UserAreaProps {
  user: User | null;
}

export default function UserArea(props: UserAreaProps) {
  return (
    <div>
      {props.user ? (
        <div>
          <UserButton avatarUrl={props.user?.avatarUrl || null} />
          <LogOutButton />
        </div>
      ) : (
        <ConnectionLinks />
      )}
    </div>
  );
}
