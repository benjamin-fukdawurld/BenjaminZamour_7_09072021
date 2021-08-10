import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import PostTitle from "./PostTitle";
import UserLink from "../common/UserLink";

import { PostHeaderProps } from "./interfaces";

export default function PostHeader(props: PostHeaderProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton
            aria-controls="options de post"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                if (props.onEdit) {
                  props.onEdit();
                }
              }}
            >
              Éditer
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                if (props.onDelete) {
                  props.onDelete();
                }
              }}
            >
              Supprimer
            </MenuItem>
            <MenuItem
              onClick={() => (window.location.href = `/user/${props.authorId}`)}
            >
              Profil Utilisateur
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <PostTitle title={props.title} />
      <PostTitle.Divider />
    </React.Fragment>
  );
}
