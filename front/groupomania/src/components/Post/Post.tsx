import React, { Component } from "react";
import { PostContainer } from "./style";

import PostActions from "./PostActions";

import PostHeader from "./PostHeader";
import PostData from "./PostData";

import Context from "../../Context";

import { PostProps, PostState } from "./interfaces";
import Comment from "../Comment";

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
          <PostHeader
            author={this.props.post.author}
            authorId={this.props.post.authorId}
            authorAvatarUrl={this.props.post.authorAvatarUrl}
            title={this.props.post.title}
          />
          <PostData
            mediaUrl={this.props.post.mediaUrl}
            title={this.props.post.title}
            description={this.props.post.description}
            tags={this.props.post.tags}
          />
          {["lorem ipsum", "sit amet doloris"].map((text: string) => (
            <Comment
              text={text}
              employeeId={1}
              login="admin"
              avatarUrl={null}
              postId={1}
              respondTo={null}
            />
          ))}
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
