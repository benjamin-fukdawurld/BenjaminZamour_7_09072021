import { Link } from "react-router-dom";
import { Theme } from "@material-ui/core/styles/createTheme";
import { useTheme } from "@material-ui/styles";

import { useStyles } from "./style";
import Avatar from "../Avatar";

import { UserLinkProps } from "./interfaces";

export default function UserLink(props: UserLinkProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);
  return (
    <Link to={`/user/${props.authorId}`}>
      <div className={classes.root}>
        <Avatar login={props.author} avatarUrl={props.authorAvatarUrl} />
        <div className={classes.login}>{props.author}</div>
      </div>
    </Link>
  );
}
