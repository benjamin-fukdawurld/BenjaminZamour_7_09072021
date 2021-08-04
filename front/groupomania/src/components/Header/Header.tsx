import React from "react";
import { getAuthData } from "../../common/auth";

import UserArea from "./UserArea";
import Logo from "./Logo";

export default function Header(props: any) {
  return (
    <header
      className="
      bg-red-700
      text-white
        flex
        flex-row
        items-center
        justify-between
        shadow-lg
        px-4 py-2
        mb-4
      "
    >
      <Logo />
      <UserArea authData={getAuthData()} />
    </header>
  );
}
