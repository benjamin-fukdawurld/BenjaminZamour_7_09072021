import React, { Component } from "react";

import Context from "../../../Context";
import Post from "../../Post";
import PostForm from "../../Post/PostForm";

interface PostPageProps {
  id: number;
  isEditing?: boolean;
}

interface PostPageState {
  isEditing: boolean;
  post: {
    id?: number;
    title: string;
    mediaUrl: string | null;
    description: string;
    tags: string[];
    upVoteCount?: number;
    downVoteCount?: number;
    commentCount?: number;
  };

  comments?: {
    id?: number;
    employeeId: number;
    text: string;
  }[];
}

export default class PostPage extends Component<PostPageProps, PostPageState> {
  static contextType = Context;

  constructor(props: PostPageProps) {
    super(props);

    this.state = {
      isEditing: !!props.isEditing,
      post: {
        title: "",
        mediaUrl: null,
        description: "",
        tags: [],
      },
    };
  }

  async loadPost() {
    /*if (this.props.id) {
      const {
        id,
        title,
        mediaUrl,
        description,
        tags,
        upVoteCount,
        downVoteCount,
        commentCount,
      } = await this.context.postService.getOne(this.props.id);
      this.setState({
        post: {
          id,
          title,
          mediaUrl,
          description,
          tags,
          upVoteCount,
          downVoteCount,
          commentCount,
        },
      });
    }
  }

  async loadComments() {
    if (this.props.id) {
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
    }
  }

  async componentDidMount() {
    this.loadPost();*/
  }

  render() {
    return <Post post={{ ...this.state.post }} />;
  }
}
