import React from "react";
import Grid from "@material-ui/core/Grid";

import PostTitle from "./PostTitle";
import UserLink from "../common/UserLink";
import MoreMenu from "../common/MoreMenu/MoreMenu";

import { PostHeaderProps } from "./interfaces";
import { TextField } from "@material-ui/core";
import { theme } from "../../Theme";

export default function PostHeader(props: PostHeaderProps) {
  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={6} sm={4}>
          <UserLink
            authorId={props.authorId}
            author={props.author}
            authorAvatarUrl={props.authorAvatarUrl}
          />
        </Grid>
        <Grid item xs={6} sm={4} style={{ textAlign: "right" }}>
          {props.isEditable && (
            <MoreMenu
              label="options de post"
              actions={[
                {
                  onClick: props.onEdit,
                  label: "Éditer",
                },
                {
                  onClick: props.onDelete,
                  label: "Supprimer",
                },
                {
                  onClick: () => {
                    window.location.href = `/user/${props.authorId}`;
                  },
                  label: "Profil Utilisateur",
                },
              ]}
            />
          )}
        </Grid>
      </Grid>
      {props.isEditing ? (
        <TextField
          value={props.title}
          style={{ marginLeft: theme.spacing(2.5) }}
          onChange={(event: any) => props.onChange(event.target.value)}
        />
      ) : (
        <PostTitle title={props.title} />
      )}
      <PostTitle.Divider />
    </React.Fragment>
  );
}
