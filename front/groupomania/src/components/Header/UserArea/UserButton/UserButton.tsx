import React from "react";
import { UserIcon } from "../../../Icons";

export default function UserButton(props: any) {
  return (
    <button
      onClick={() => {
        window.location.href = "/user";
      }}
      className="mr-1"
      title="profile utilisateur"
    >
      <UserIcon />
    </button>
  );
}
