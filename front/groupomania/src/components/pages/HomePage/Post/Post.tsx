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
  userId: number;
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

export interface PostState {}

export default class Post extends Component<PostProps, PostState> {
  private server: AxiosInstance;
  private authData: AuthData | null;

  constructor(props: PostProps) {
    super(props);

    this.authData = getAuthData();
    this.server = createServer(this.authData?.token);

    this.handleLike = this.handleLike.bind(this);
  }

  handleLike() {
    this.server.post("/votes/", {
      employeeId: 1,
      postId: 1,
      value: 1,
    });
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
          upVoteCount={this.props.upVoteCount}
          onLike={() => console.log("like")}
          downVoteCount={this.props.downVoteCount}
          onDislike={() => console.log("dislike")}
          commentCount={this.props.commentCount}
          onComment={() => console.log("comment")}
        />{" "}
      </React.Fragment>
    );
  }
}
