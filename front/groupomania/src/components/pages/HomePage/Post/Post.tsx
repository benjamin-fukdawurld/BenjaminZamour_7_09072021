import React, { Component } from "react";
import { AxiosInstance } from "axios";
import { PostContainer } from "./style";
import { Typography, Divider } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

import PostActions from "./PostActions";
import createServer from "../../../../common/server";
import { getAuthData } from "../../../../common/auth";
import { AuthData } from "../../../../interfaces/AuthData";
import { theme } from "../../../../Theme";

export interface PostProps {
  id: number;
  authorId: number;
  title: string;
  mediaUrl: string | null;
  description: string | null;
  tags: string[];
  publishDate: Date;
  lastModificationDate: Date | null;
  upVoteCount: number | null;
  downVoteCount: number | null;
  commentCount: number | null;
}

export interface PostState {
  liked: boolean;
  disliked: boolean;
}

export default class Post extends Component<PostProps, PostState> {
  private server: AxiosInstance;
  private authData: AuthData | null;

  constructor(props: PostProps) {
    super(props);

    this.authData = getAuthData();
    this.server = createServer(this.authData?.token);

    this.state = {
      liked: false,
      disliked: false,
    };

    this.handleLike = this.handleLike.bind(this);
  }

  private async vote(value: number) {
    return this.server.post("/votes/", {
      employeeId: this.props.authorId,
      postId: this.props.id,
      value,
    });
  }

  private async unvote() {
    return this.server.delete(
      `/votes/post/${this.props.id}/${this.props.authorId}`
    );
  }

  async handleLike() {
    try {
      if (!this.state.liked) {
        await this.unvote();
      } else {
        await this.vote(1);
      }

      this.setState({ liked: !this.state.liked });
    } catch (err) {
      console.log(err);
    }
  }

  async handleDislike() {
    try {
      if (!this.state.disliked) {
        await this.unvote();
      } else {
        await this.vote(-1);
      }

      this.setState({ disliked: !this.state.disliked });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <React.Fragment>
        <PostContainer component="article" data-id={this.props.id}>
          <Typography
            variant="h1"
            component="h2"
            style={{
              margin: theme.spacing(2),
              marginBottom: theme.spacing(0.5),
            }}
          >
            {this.props.title}
          </Typography>
          <Divider
            variant="middle"
            color="primary"
            light
            style={{
              borderTop: "solid 1px",

              borderColor: theme.palette.primary.dark,

              opacity: 0.2,
            }}
          />
          <div style={{ margin: theme.spacing(2) }}>
            {this.props.mediaUrl && (
              <img src={this.props.mediaUrl} alt={this.props.title} />
            )}
            {this.props.description && (
              <Typography variant="body1">{this.props.description}</Typography>
            )}
            <div className="flex flex-row justify-start items-center flex-wrap mt-2">
              {this.props.tags.map((tag: string, index: number) => (
                <Chip
                  key={index}
                  label={tag}
                  color="primary"
                  style={{ margin: theme.spacing(1), height: "1.5rem" }}
                  onClick={() => console.log("not implemented yet")}
                />
              ))}
            </div>
          </div>
        </PostContainer>
        <PostActions
          liked={this.state.liked}
          upVoteCount={this.props.upVoteCount}
          onLike={this.handleLike}
          disliked={this.state.disliked}
          downVoteCount={this.props.downVoteCount}
          onDislike={this.handleLike}
          commentCount={this.props.commentCount}
          onComment={() => console.log("comment")}
        />{" "}
      </React.Fragment>
    );
  }
}
