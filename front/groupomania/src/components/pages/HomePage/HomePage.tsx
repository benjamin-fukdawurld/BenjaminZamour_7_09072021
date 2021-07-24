import axios, { AxiosResponse } from "axios";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import { getAuthData } from "../../../common/auth";
import Post, { PostProps } from "../../Post";

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
          <main className="d-flex flex-col justify-content-evenly align-items-center w-75 mx-auto">
            {this.state.posts.map((post: PostProps) => (
              <Post key={post.id} {...post} />
            ))}
          </main>
        );
      }
    }

    return <Redirect to="/signin" />;
  }
}
