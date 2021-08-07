import React, { ElementType } from "react";
import { useTheme } from "@material-ui/styles";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

interface PostActionProps {
  active?: boolean;
  count: number | null;
  label: string;
  icon: ElementType;
  onClick: () => void;
}

export default function PostAction(props: PostActionProps) {
  const theme = useTheme<any>();
  const Icon = props.icon;
  return (
    <React.Fragment>
      <Hidden xsDown>
        <Button
          style={{
            color: props.active
              ? theme.palette.secondary
              : theme.palette.primary.contrastText,
            minWidth: "20%",
          }}
          color="primary"
          onClick={props.onClick}
        >
          {props.count && props.count}
          <Icon
            style={{
              width: "1.2rem",
              height: "1.2rem",
              margin: theme.spacing(0, 1),
            }}
          />
          {props.label}
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          style={{
            color: props.active
              ? theme.palette.secondary
              : theme.palette.primary.contrastText,
          }}
          onClick={props.onClick}
        >
          <Icon />
        </IconButton>
      </Hidden>
    </React.Fragment>
  );
}
