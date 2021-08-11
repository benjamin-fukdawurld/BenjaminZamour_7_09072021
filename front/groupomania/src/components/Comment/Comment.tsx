import React, { createRef, useState } from "react";

import { makeStyles, useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles/createTheme";
import Grid from "@material-ui/core/Grid";
import UserLink from "../common/UserLink";
import { alpha, IconButton, TextField } from "@material-ui/core";
import MoreMenu from "../common/MoreMenu/MoreMenu";
import SendIcon from "@material-ui/icons/Send";

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
    width: "inherit",
    height: "2rem",
    borderBottomRightRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem",
    boxShadow: `6px 6px 20px ${alpha(theme.palette.primary.dark, 0.2)}`,
    background: `linear-gradient(to left bottom, ${alpha(
      theme.palette.primary.dark,
      0.4
    )}, ${alpha(theme.palette.primary.dark, 0.9)})`,
    margin: theme.spacing(0, 2, 2),
    padding: theme.spacing(0, 1),
  },
}));

interface CommentProps {
  id?: number;
  employeeId: number;
  text: string;
  login: string;
  avatarUrl: string | null;
  isEditable?: boolean;
  isEditing?: boolean;
  noMenu?: boolean;
  onSubmit?: (comment: { id?: number; text: string }) => void;
  onDelete?: () => void;
}

export default function Comment(props: CommentProps) {
  let [isEditing, setEditing] = useState(!!props.isEditing);
  let [isSubmitable, setSubmitable] = useState(false);
  let ref = createRef<any>();

  const theme = useTheme<Theme>();
  const classes = useStyles(theme);
  const Container = (p: any) =>
    props.isEditable
      ? React.createElement("form", p)
      : React.createElement("div", p);

  return (
    <div>
      <Container>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6} sm={8}>
                  <UserLink
                    author={props.login}
                    authorId={props.employeeId}
                    authorAvatarUrl={props.avatarUrl}
                  />
                </Grid>
                <Grid item xs={6} sm={4} style={{ textAlign: "right" }}>
                  {props.isEditable && !props.noMenu && (
                    <MoreMenu
                      label="options de post"
                      actions={[
                        {
                          onClick: () => setEditing(true),
                          label: "Éditer",
                        },
                        {
                          onClick: props.onDelete,
                          label: "Supprimer",
                        },
                        {
                          onClick: () => {
                            window.location.href = `/user/${props.employeeId}`;
                          },
                          label: "Profil Utilisateur",
                        },
                      ]}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: "2rem" }}>
              {!isEditing ? (
                props.text
              ) : (
                <div>
                  <TextField
                    multiline
                    required
                    label="text du commentaire"
                    inputRef={ref}
                    style={{ width: "100%", margin: theme.spacing(0, 1) }}
                    defaultValue={props.text}
                    onChange={() => setSubmitable(ref.current.value.length > 0)}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
        <Grid
          container
          className={classes.actions}
          justifyContent={isEditing ? "flex-end" : "space-evenly"}
        >
          {!isEditing ? (
            <React.Fragment></React.Fragment>
          ) : (
            <IconButton
              size="small"
              style={{
                color: isSubmitable
                  ? theme.palette.primary.contrastText
                  : theme.palette.grey[400],
              }}
              disabled={!isSubmitable}
              onClick={() => {
                if (props.onSubmit) {
                  props.onSubmit({
                    id: props.id as number,
                    text: ref.current.value,
                  });
                  setSubmitable(false);
                }

                if (props.id) {
                  setEditing(false);
                }
              }}
            >
              <SendIcon />
            </IconButton>
          )}
        </Grid>
      </Container>
    </div>
  );
}
