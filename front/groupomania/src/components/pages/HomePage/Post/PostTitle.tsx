import React from "react";
import { useTheme, makeStyles, withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { theme } from "../../../../Theme";

interface PostTitleProps {
  title: string | null;
}

const useStyle = makeStyles((theme: any) => ({
  root: {
    margin: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
}));

export default function PostTitle(props: PostTitleProps) {
  const classes = useStyle(useTheme<any>());
  return (
    <Typography variant="h1" component="h2" classes={{ root: classes.root }}>
      {props.title && props.title}
    </Typography>
  );
}

const dividerStyle = {
  root: {
    borderTop: "solid 1px",
    borderColor: theme.palette.primary.dark,
    opacity: 0.2,
  },
};

PostTitle.Divider = withStyles(dividerStyle)((props: any) => (
  <Divider classes={props.classes} variant="middle" color="primary" light />
));
