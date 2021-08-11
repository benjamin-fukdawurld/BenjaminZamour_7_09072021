import { AxiosInstance } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Post, { PostProps } from "../../Post";
import PostForm from "../../Post/PostForm";
import Main from "../../common/Main";

import PostModel from "../../../interfaces/Post";
import createServer from "../../../server/server";
import { getPost } from "../../../server/PostService";
import AuthData from "../../../interfaces/AuthData";

import Context from "../../../Context";
import Vote from "../../../interfaces/Vote";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { theme } from "../../../Theme";

interface HomePageState {
  posts: PostProps[];
  newPostTitle: string;
  newPostText: string;
  newPostTags: string[];
  newPostImageUrl: string;
  newPostImage: File | null;
  alert?: {
    open: boolean;
    severity: "error" | "success" | "info" | "warning";
    message: string;
  };
  progress?: boolean;
}

export default class HomPage extends Component<{}, HomePageState> {
  static contextType = Context;
  private server: AxiosInstance;
  private authData: AuthData | null;
  constructor(props: any) {
    super(props);

    this.authData = getAuthData();
    this.server = createServer(this.authData?.token);

    this.state = {
      posts: [],
      newPostText: "",
      newPostTitle: "",
      newPostTags: [],
      newPostImageUrl: "",
      newPostImage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  async handleSubmit(event: any) {
    try {
      this.setState({ progress: true });
      let post = {
        employeeId: this.authData?.userId as number,
        title: this.state.newPostTitle,
        tags: this.state.newPostTags.join(",") || null,
        description: this.state.newPostText,
      };

      let data: any;
      if (this.state.newPostImage) {
        data = new FormData();
        data.append("image", this.state.newPostImage);
        data.append("post", JSON.stringify(post));
      } else {
        data = post;
      }

      await this.context.postService.add(data);
    } catch (err: any) {
      this.setState({ progress: undefined });
      this.setState({
        alert: {
          open: true,
          severity: "error",
          message: "Échec de la publication",
        },
      });
    }
  }

  async componentDidMount() {
    this.setState({ progress: true });
    const userId = this.authData?.userId as number;
    const posts = (await this.context.postService.getAll()) as PostModel[];

    let votes: Vote[] = [];
    for (const post of posts) {
      try {
        const vote = await this.context.voteService.getOne({
          employeeId: userId,
          postId: post.id,
        });
        votes.push(vote);
      } catch (error: any) {
        if (error.response.status !== 404) {
          this.setState({
            alert: {
              open: true,
              severity: "error",
              message: "Échec de la publication",
            },
          });
        }
      }
    }

    this.setState({
      progress: undefined,
      posts: posts.map((post: PostModel) => {
        const vote = votes.find((value: Vote) => value.postId === post.id);
        if (vote) {
          return {
            post,
            onVote: (value: number) => this.handleVote(post.id, value),
            vote,
          };
        }

        return {
          post,
          onVote: (value: number) => this.handleVote(post.id, value),
        };
      }),
    });
  }

  private async vote(post: PostModel, value: number) {
    return this.server.post("/votes/", {
      employeeId: this.context.user.id,
      postId: post.id,
      value,
    });
  }

  private async unvote(post: PostModel) {
    return this.server.delete(`/votes/post/${post.id}/${this.context.user.id}`);
  }

  private async changeVote(post: PostModel, value: number) {
    return this.server.put(`/votes/post/${post.id}/${this.context.user.id}`, {
      value,
    });
  }

  async handleVote(id: number, value: number) {
    const newProps = await Promise.all(
      this.state.posts.map(async (postProps: PostProps) => {
        if (postProps.post.id === id) {
          if (value !== 0) {
            if (!postProps.vote) {
              await this.vote(postProps.post, value);
            } else {
              await this.changeVote(postProps.post, value);
            }
            postProps.vote = {
              employeeId: this.context.user.id,
              postId: postProps.post.id,
              value: value,
            };
          } else if (postProps.vote) {
            await this.unvote(postProps.post);
            delete postProps.vote;
          }

          postProps.post = await getPost(this.server, id);
        }

        return postProps;
      })
    );

    this.setState({
      posts: newProps,
    });
  }

  render() {
    if (!isLogged()) {
      return <Redirect to="/signin" />;
    }

    return (
      <Main>
        <PostForm
          postTitle={this.state.newPostTitle}
          postText={this.state.newPostText}
          postTags={this.state.newPostTags}
          postImageUrl={this.state.newPostImageUrl}
          onAddTag={(tag: string) =>
            this.setState({ newPostTags: [tag, ...this.state.newPostTags] })
          }
          onDeleteTag={(tag: string) => {
            this.setState({
              newPostTags: this.state.newPostTags.filter(
                (current: string) => current !== tag
              ),
            });
          }}
          onTitleChange={(event: any) =>
            this.setState({ newPostTitle: event.target.value })
          }
          onTextChange={(event: any) =>
            this.setState({ newPostText: event.target.value })
          }
          onImageChange={(event: any) => {
            if (!event.target?.files?.length) {
              return;
            }

            const file = event.target.files[0];
            if (this.state.newPostImageUrl) {
              URL.revokeObjectURL(this.state.newPostImageUrl);
            }
            this.setState({
              newPostImage: file,
              newPostImageUrl: URL.createObjectURL(file),
            });
          }}
          onSubmit={this.handleSubmit}
        />
        {this.state.posts.map((post: PostProps) => (
          <Post key={post.post.id} {...post} />
        ))}
        <Snackbar
          open={this.state.alert?.open}
          autoHideDuration={6000}
          onClose={() => this.setState({ alert: undefined })}
        >
          <Alert severity={this.state.alert?.severity}>
            {this.state.alert?.message}
          </Alert>
        </Snackbar>
        <Backdrop
          open={!!this.state.progress}
          style={{
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.primary.main,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Main>
    );
  }
}
