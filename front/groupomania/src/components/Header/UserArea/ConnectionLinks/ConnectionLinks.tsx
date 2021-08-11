import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Theme } from "@material-ui/core/styles/createTheme";
import { useTheme } from "@material-ui/styles";

export default function ConnectionLinks(props: any) {
  const theme = useTheme<Theme>();
  return (
    <div>
      <Link to="/signin">
        <IconButton
          color="primary"
          title="se connecter"
          style={{ padding: 0, marginRight: theme.spacing(2) }}
        >
          <PersonOutlineIcon
            style={{
              height: "3rem",
              width: "3rem",
            }}
          />
        </IconButton>
      </Link>
      <Link to="/signup">
        <IconButton color="primary" title="s'inscrire" style={{ padding: 0 }}>
          <AssignmentIcon style={{ height: "3rem", width: "3rem" }} />
        </IconButton>
      </Link>
    </div>
  );
}
