import React from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createTheme";
import Grid from "@material-ui/core/Grid";
import UserLink from "../common/UserLink";
import { alpha, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "4rem",
    borderTopRightRadius: "0.5rem",
    borderTopLeftRadius: "0.5rem",
    boxShadow: `6px 6px 20px ${alpha(theme.palette.primary.dark, 0.2)}`,
    background:
      "linear-gradient(to left top, rgba(255, 224, 224, 0.3), rgba(255, 255, 255, 0.8))",
    margin: theme.spacing(2, 2, 0),
    padding: theme.spacing(1),
  },

  actions: {
    height: "2rem",
    borderBottomRightRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
    boxShadow: `6px 6px 20px ${alpha(theme.palette.primary.dark, 0.2)}`,
    background: `linear-gradient(to left bottom, ${alpha(
      theme.palette.primary.dark,
      0.4
    )}, ${alpha(theme.palette.primary.dark, 0.9)})`,
    margin: theme.spacing(0, 2, 2),
  },
}));

interface CommentProps {
  employeeId: number;
  login: string;
  avatarUrl: string | null;
  postId: number;
  respondTo: number | null;
  text: string;
  isEditable?: boolean;
  onChange?: (event: any) => void;
  onSubmit?: (event: any) => void;
}

export default function Comment(props: CommentProps) {
  const theme = useTheme<Theme>();
  const classes = useStyles(theme);
  const Container = (props: any) =>
    props.isEditable
      ? React.createElement("form", props)
      : React.createElement("div", props);

  return (
    <Container>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <UserLink
              author={props.login}
              authorId={props.employeeId}
              authorAvatarUrl={props.avatarUrl}
            />
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: "2rem" }}>
            {props.isEditable ? (
              props.text
            ) : (
              <TextField
                multiline
                required
                style={{ width: "100%", margin: theme.spacing(0, 1) }}
                value={props.text}
                onChange={props.onChange}
              />
            )}
          </Grid>
        </Grid>
      </div>
      <div className={classes.actions}></div>
    </Container>
  );
}
