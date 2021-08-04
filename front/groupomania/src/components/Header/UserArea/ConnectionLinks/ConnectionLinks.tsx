import React from "react";
import { Link } from "react-router-dom";

export default function ConnectionLinks(props: any) {
  return (
    <div>
      <Link to="/signup">
        <button>Se connecter</button>
      </Link>
      <Link to="/signup">
        <button>S'incrire</button>
      </Link>
    </div>
  );
}
