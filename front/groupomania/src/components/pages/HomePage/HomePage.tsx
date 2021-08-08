import { AxiosInstance } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Post, { PostProps } from "./Post";
import PostForm from "./PostForm";
import Main from "../../common/Main";

import PostModel from "../../../interfaces/Post";
import createServer from "../../../server/server";
import { addPost, getPost, getPosts } from "../../../server/PostService";

interface HomePageState {
  posts: PostProps[];
  newPostTitle: string;
  newPostText: string;
  newPostTags: string[];
}

export default class HomPage extends Component<{}, HomePageState> {
  private server: AxiosInstance;
  constructor(props: any) {
    super(props);

    this.server = createServer(getAuthData()?.token);

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
        employeeId: getAuthData()?.userId as number,
        title: this.state.newPostTitle,
        tags: this.state.newPostTags.join(","),
        description: this.state.newPostText,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async componentDidMount() {
    const res = await getPosts(this.server);
    this.setState({
      posts: res.map((post: PostModel) => ({
        post,
        onVote: () => this.handleVote(post.id),
      })),
    });
  }

  async handleVote(id: number) {
    const post = await getPost(this.server, id);

    this.setState({
      posts: this.state.posts.map((props: PostProps) =>
        props.post.id !== id
          ? props
          : { post, onVote: () => this.handleVote(id) }
      ),
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
