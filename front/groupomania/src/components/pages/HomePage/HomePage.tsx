import axios, { AxiosResponse } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData, isLogged } from "../../../common/auth";
import Post, { PostProps } from "./Post";
import PostForm from "./PostForm";
import Main from "../../common/Main";

interface HomePageState {
  posts: PostProps[];
  newPostTitle: string;
  newPostText: string;
  newPostTags: string[];
}

export default class HomPage extends Component<{}, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      posts: [],
      newPostText: "",
      newPostTitle: "",
      newPostTags: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event: any) {
    try {
      await axios.post(
        "http://localhost:5000/posts",
        {
          employeeId: getAuthData()?.userId as number,
          title: this.state.newPostTitle,
          tags: this.state.newPostTags.join(","),
          description: this.state.newPostText,
        },
        {
          headers: {
            Authorization: `Bearer ${getAuthData()?.token}`,
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/posts", {
        headers: {
          Authorization: `Bearer ${getAuthData()?.token}`,
        },
      })
      .then((res: AxiosResponse) => {
        this.setState({
          posts: res.data.map((post: any): PostProps => {
            return {
              id: post.id,
              userId: post.employeeid,
              title: post.title,
              mediaUrl: post.mediaurl,
              tags: post.tags.split(","),
              description: post.description,
              publishDate: new Date(post.publishdate),
              lastModificationDate: post.lastmodificationdate
                ? new Date(post.lastmodificationdate)
                : null,
              upVoteCount: post.upVoteCount,
              downVoteCount: post.downVoteCount,
              commentCount: post.commentCount,
            };
          }),
        });
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
          <Post key={post.id} {...post} />
        ))}
      </Main>
    );
  }
}
