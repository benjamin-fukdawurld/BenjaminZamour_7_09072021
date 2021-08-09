import { AxiosInstance, AxiosResponse } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Post, { PostProps } from "./Post";
import PostForm from "./PostForm";
import Main from "../../common/Main";

import PostModel from "../../../interfaces/Post";
import createServer from "../../../server/server";
import { addPost, getPost, getPosts } from "../../../server/PostService";
import AuthData from "../../../interfaces/AuthData";

interface HomePageState {
  posts: PostProps[];
  newPostTitle: string;
  newPostText: string;
  newPostTags: string[];
}

export default class HomPage extends Component<{}, HomePageState> {
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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  async handleSubmit(event: any) {
    try {
      await addPost(this.server, {
        employeeId: this.authData?.userId as number,
        title: this.state.newPostTitle,
        tags: this.state.newPostTags.join(","),
        description: this.state.newPostText,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidMount() {
    const userId = this.authData?.userId as number;
    const res = await getPosts(this.server);
    let voteResponses = await Promise.allSettled(
      res.map((post: PostModel) =>
        this.server.get(`/votes/post/${post.id}/${userId}`)
      )
    );

    voteResponses = voteResponses.filter(
      (result) => result.status === "fulfilled"
    );

    const votes = voteResponses.map(
      (value: PromiseSettledResult<AxiosResponse<any>>) => {
        return (value as PromiseFulfilledResult<AxiosResponse<any>>).value.data;
      }
    );

    this.setState({
      posts: res.map((post: PostModel) => {
        const vote = votes.find((value: any) => value.postId === post.id);
        if (vote) {
          return {
            post,
            onVote: (value: number) => this.handleVote(post.id, value),
            vote: { postId: vote.postId, value: vote.value },
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
      employeeId: post.authorId,
      postId: post.id,
      value,
    });
  }

  private async unvote(post: PostModel) {
    return this.server.delete(`/votes/post/${post.id}/${post.authorId}`);
  }

  private async changeVote(post: PostModel, value: number) {
    return this.server.put(`/votes/post/${post.id}/${post.authorId}`, {
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
            postProps.vote = { postId: postProps.post.id, value: value };
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
          onSubmit={this.handleSubmit}
        />
        {this.state.posts.map((post: PostProps) => (
          <Post key={post.post.id} {...post} />
        ))}
      </Main>
    );
  }
}
