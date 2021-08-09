import React, { Component } from "react";
import { PostContainer } from "./style";

import PostActions from "./PostActions";

import PostTitle from "./PostTitle";
import PostData from "./PostData";
import PostModel from "../../../../interfaces/Post";

import Context from "../../../../Context";

interface UserVote {
  postId: number;
  value: number;
}
export interface PostProps {
  post: PostModel;
  onVote: (value: number) => void;
  vote?: UserVote | null;
}

export interface PostState {
  liked: boolean;
  disliked: boolean;
}

export default class Post extends Component<PostProps, PostState> {
  get liked() {
    return this.props.vote?.value ? this.props.vote.value > 0 : false;
  }

  get disliked() {
    return this.props.vote?.value ? this.props.vote.value < 0 : false;
  }

  render() {
    return (
      <React.Fragment>
        <PostContainer component="article" data-id={this.props.post.id}>
          <PostTitle title={this.props.post.title} />
          <PostTitle.Divider />
          <PostData
            mediaUrl={this.props.post.mediaUrl}
            title={this.props.post.title}
            description={this.props.post.description}
            tags={this.props.post.tags}
          />
        </PostContainer>
        <PostActions
          liked={this.liked}
          upVoteCount={this.props.post.upVoteCount}
          onLike={() => this.props.onVote(this.liked ? 0 : 1)}
          disliked={this.disliked}
          downVoteCount={this.props.post.downVoteCount}
          onDislike={() => this.props.onVote(this.disliked ? 0 : -1)}
          commentCount={this.props.post.commentCount}
          onComment={() => console.log("comment")}
        />
      </React.Fragment>
    );
  }
}

Post.contextType = Context;
