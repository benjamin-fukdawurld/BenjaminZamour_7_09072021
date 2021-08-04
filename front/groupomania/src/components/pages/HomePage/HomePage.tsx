import axios, { AxiosResponse } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData } from "../../../common/auth";
import Post, { PostProps } from "../../Post";
import Main from "../../Main";

interface HomePageState {
  posts: PostProps[];
}

export default class HomPage extends Component<{}, HomePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      posts: [],
    };
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
            };
          }),
        });
      });
  }

  render() {
    if ("groupomania_auth" in localStorage) {
      const authData = getAuthData();
      if (authData?.userId) {
        return (
          <Main>
            {this.state.posts.map((post: PostProps) => (
              <Post key={post.id} {...post} />
            ))}
          </Main>
        );
      }
    }

    return <Redirect to="/signin" />;
  }
}
