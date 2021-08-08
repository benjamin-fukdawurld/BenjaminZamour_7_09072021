import React, { Component } from "react";
import { PostContainer } from "./style";

import PostActions from "./PostActions";

import PostTitle from "./PostTitle";
import PostData from "./PostData";
import PostModel from "../../../../interfaces/Post";

import Context from "../../../../Context";

export interface PostProps {
  post: PostModel;
  onVote: () => void;
}

export interface PostState {
  liked: boolean;
  disliked: boolean;
}

export default class Post extends Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);

    this.state = {
      liked: false,
      disliked: false,
    };

    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  private async vote(value: number) {
    return this.context.server.post("/votes/", {
      employeeId: this.props.post.authorId,
      postId: this.props.post.id,
      value,
    });
  }

  private async unvote() {
    return this.context.server.delete(
      `/votes/post/${this.props.post.id}/${this.props.post.authorId}`
    );
  }

  private async changeVote(value: number) {
    return this.context.server.put(
      `/votes/post/${this.props.post.id}/${this.props.post.authorId}`,
      {
        value,
      }
    );
  }

  async handleLike() {
    try {
      if (this.state.liked) {
        await this.unvote();
      } else if (this.state.disliked) {
        await this.changeVote(1);
        this.setState({ disliked: false });
      } else {
        await this.vote(1);
      }

      this.props.onVote();

      this.setState({ liked: !this.state.liked });
    } catch (err) {
      console.log(err);
    }
  }

  async handleDislike() {
    try {
      if (this.state.disliked) {
        await this.unvote();
      } else if (this.state.liked) {
        await this.changeVote(-1);
        this.setState({ liked: false });
      } else {
        await this.vote(-1);
      }

      this.props.onVote();

      this.setState({ disliked: !this.state.disliked });
    } catch (err) {
      console.log(err);
    }
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
          liked={this.state.liked}
          upVoteCount={this.props.post.upVoteCount}
          onLike={this.handleLike}
          disliked={this.state.disliked}
          downVoteCount={this.props.post.downVoteCount}
          onDislike={this.handleDislike}
          commentCount={this.props.post.commentCount}
          onComment={() => console.log("comment")}
        />
      </React.Fragment>
    );
  }
}

Post.contextType = Context;
