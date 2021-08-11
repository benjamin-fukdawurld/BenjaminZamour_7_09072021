import React from "react";
import { useTheme } from "@material-ui/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import CommentIcon from "@material-ui/icons/Comment";

import Action from "./PostAction";

import { PostActionsProps } from "./interfaces";

export default function PostActions(props: PostActionsProps) {
  const theme = useTheme<any>();
  return (
    <div
      style={{
        backgroundColor: `${theme.palette.primary.main}99`,
        backdropFilter: "blur(12px)",
        width: "100%",
        height: "2.5rem",
        borderBottomLeftRadius: "0.75rem",
        borderBottomRightRadius: "0.75rem",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        color: theme.palette.primary.contrastText,
      }}
    >
      <Action
        active={props.liked}
        count={props.upVoteCount}
        icon={ThumbUpIcon}
        label="j'aime"
        onClick={props.onLike}
      />
      <Action
        active={props.disliked}
        count={props.downVoteCount}
        icon={ThumbDownIcon}
        label="je n'aime pas"
        onClick={props.onDislike}
      />
      <Action
        count={props.commentCount}
        icon={CommentIcon}
        label="commenter"
        onClick={props.onComment}
      />
    </div>
  );
}
