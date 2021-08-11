import MuiAvatar from "@material-ui/core/Avatar";
import { theme } from "../../../Theme";
import { alpha } from "@material-ui/core/styles/";

import { AvatarProps } from "./interfaces";

export default function Avatar(props: AvatarProps) {
  return (
    <MuiAvatar
      title={props.login}
      alt={`avatar de ${props.login}`}
      src={props.avatarUrl ?? undefined}
      style={{
        border: "solid 2px",
        borderColor: alpha(theme.palette.primary.main, 0.6),
      }}
    />
  );
}
