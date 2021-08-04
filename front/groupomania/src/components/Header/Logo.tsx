import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { IconLeft, Icon } from "../Icons";

export default function Logo(props: any) {
  return (
    <Link to="/" title="accueil">
      {useMediaQuery({ query: "(max-width: 768px)" }) ? (
        <Icon width="5rem" height="5rem" />
      ) : (
        <IconLeft />
      )}
    </Link>
  );
}
