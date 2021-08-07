import Box from "@material-ui/core/Box";
import MuiAvatar from "@material-ui/core/Avatar";

import { styled } from "@material-ui/core/styles";
import { theme } from "../../../../Theme";

const User = styled(Box)({
  backgroundColor: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(12px)",
  borderRadius: "0.75rem",
  margin: "auto",
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.up("md")]: {
    width: "66%",
  },
});

const Avatar = styled(MuiAvatar)({
  backgroundColor: theme.palette.primary.main,
  border: "solid 2px white",
  width: "3rem",
  height: "3rem",
});

const InfoContainer = styled(Box)({
  width: "100%",
  paddingTop: theme.spacing(2),
  margin: `${theme.spacing(1)}px 0`,
});

export { User, Avatar, InfoContainer };
