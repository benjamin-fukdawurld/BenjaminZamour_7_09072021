import React from "react";

import PostTitle from "./PostTitle";
import UserLink from "../common/UserLink";

import { PostHeaderProps } from "./interfaces";

export default function PostHeader(props: PostHeaderProps) {
  return (
    <React.Fragment>
      <UserLink
        authorId={props.authorId}
        author={props.author}
        authorAvatarUrl={props.authorAvatarUrl}
      />
      <PostTitle title={props.title} />
      <PostTitle.Divider />
    </React.Fragment>
  );
}
