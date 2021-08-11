import React, { Component } from "react";
import { PostContainer } from "./style";

import PostActions from "./PostActions";

import PostHeader from "./PostHeader";
import PostData from "./PostData";

import Context from "../../Context";

import { PostProps, PostState } from "./interfaces";
import Comment from "../Comment";
import CommentModel from "../../interfaces/Comment";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { theme } from "../../Theme";

export default class Post extends Component<PostProps, PostState> {
  static contextType = Context;

  constructor(props: PostProps) {
    super(props);

    this.state = {
      isEditing: false,
      title: props.post.title,
      description: props.post.description ?? "",
      mediaUrl: props.post.mediaUrl,
      tags: props.post.tags,
      comments: [],
      commentDelta: 0,
      newComment: null,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleDelete() {
    await this.context.postService.del(this.props.post.id);
    window.location.href = "/";
  }

  get liked() {
    return this.props.vote?.value ? this.props.vote.value > 0 : false;
  }

  get disliked() {
    return this.props.vote?.value ? this.props.vote.value < 0 : false;
  }

  async loadComments() {
    this.setState({
      comments: await this.context.commentService.getAll(
        { postId: this.props.post.id },
        { respondTo: null }
      ),
    });
  }

  async componentDidMount() {
    await this.loadComments();
  }

  render() {
    const comments = this.state.comments;
    return (
      <React.Fragment>
        <PostContainer component="article" data-id={this.props.post.id}>
          <PostHeader
            isEditing={this.state.isEditing}
            author={this.props.post.author}
            authorId={this.props.post.authorId}
            authorAvatarUrl={this.props.post.authorAvatarUrl}
            title={this.state.title}
            isEditable={
              this.props.post.authorId === this.context?.user?.id ||
              this.context?.user?.privilege > 0
            }
            onChange={(title: string) => this.setState({ title })}
            onEdit={() => this.setState({ isEditing: true })}
            onDelete={this.handleDelete}
          />
          <PostData
            isEditing={this.state.isEditing}
            mediaUrl={this.state.mediaUrl}
            title={this.props.post.title}
            description={this.state.description}
            tags={this.state.tags}
            onDescriptionChange={(event: any) => {
              this.setState({ description: event.target.value });
            }}
            onAddTag={(tag: string) => {
              const tags = this.state.tags;
              tags.push(tag);
              this.setState({ tags });
            }}
            onDeleteTag={(tag: string) => {
              const tags = this.state.tags.filter(
                (current: string) => tag !== current
              );
              this.setState({ tags });
            }}
            onDeleteImage={() => {
              if (this.state.mediaUrl) {
                URL.revokeObjectURL(this.state.mediaUrl as string);
              }
              this.setState({ mediaUrl: null });
            }}
            onImageChange={(image: any, previewUrl: string) => {
              if (this.state.mediaUrl) {
                URL.revokeObjectURL(this.state.mediaUrl as string);
              }

              this.setState({ image, mediaUrl: previewUrl });
            }}
          />
          {comments.map((comment: CommentModel, index: number) => (
            <Comment
              key={comment.id}
              id={comment.id}
              employeeId={comment.employeeId}
              text={comment.text}
              login={comment.login}
              avatarUrl={comment.avatarUrl}
              onDelete={async () => {
                await this.context.commentService.del(comment.id);
                const comments = this.state.comments;
                comments.splice(index, 1);
                this.setState({
                  comments,
                  commentDelta: this.state.commentDelta - 1,
                });
              }}
              onSubmit={async (comment: { id?: number; text: string }) => {
                const comments = this.state.comments;
                comments[index].text = comment.text;
                this.setState({ comments });
                await this.context.commentService.update(
                  comment.id as number,
                  comment.text
                );
                this.setState({ commentDelta: this.state.commentDelta + 1 });
              }}
              isEditable={
                comment.employeeId === this.context?.user?.id ||
                this.context?.user?.privilege > 0
              }
            />
          ))}
          <Collapse in={!!this.state.newComment}>
            <Comment
              employeeId={this.state.newComment?.employeeId as number}
              text={this.state.newComment?.text as string}
              login={this.state.newComment?.login as string}
              avatarUrl={this.state.newComment?.avatarUrl ?? null}
              noMenu
              onSubmit={async (comment: { id?: number; text: string }) => {
                const data = Object.assign({
                  employeeId: this.state.newComment?.employeeId,
                  postId: this.state.newComment?.postId,
                  text: comment.text,
                });
                await this.context.commentService.add(data);
                this.setState(
                  {
                    commentDelta: this.state.commentDelta + 1,
                    newComment: null,
                  },
                  () => this.loadComments()
                );
              }}
              isEditable
              isEditing
            />
          </Collapse>
          {this.state.isEditing && (
            <div
              style={{
                textAlign: "right",
                marginBottom: theme.spacing(1),
                marginRight: theme.spacing(1),
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: theme.spacing(1) }}
                onClick={(event: any) => {
                  this.setState({
                    title: this.props.post.title,
                    description: this.props.post.description ?? "",
                    tags: this.props.post.tags,
                    comments: [],
                    isEditing: false,
                  });
                }}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(event: any) => {
                  const post = {
                    title: this.state.title,
                    description: this.state.description,
                    mediaUrl:
                      this.state.mediaUrl === null
                        ? this.state.mediaUrl
                        : undefined,
                  };
                  if (this.state.image) {
                    const data = new FormData();
                    data.append("image", this.state.image);
                    data.append("post", JSON.stringify(post));
                    this.context.postService.update(this.props.post.id, data);
                  }

                  this.context.postService.update(this.props.post.id, post);
                  this.setState({ isEditing: false });
                }}
              >
                Save
              </Button>
            </div>
          )}
        </PostContainer>
        <PostActions
          liked={this.liked}
          upVoteCount={this.props.post.upVoteCount}
          onLike={() => this.props.onVote(this.liked ? 0 : 1)}
          disliked={this.disliked}
          downVoteCount={this.props.post.downVoteCount}
          onDislike={() => this.props.onVote(this.disliked ? 0 : -1)}
          commentCount={
            (this.props.post.commentCount ?? 0 + this.state.commentDelta) ||
            null
          }
          onComment={() => {
            this.setState({
              newComment: {
                employeeId: this.context?.user?.id,
                postId: this.props.post.id,
                text: "",
                login: this.context?.user?.login,
                avatarUrl: this.context?.user?.avatarUrl,
              },
            });
          }}
        />
      </React.Fragment>
    );
  }
}

Post.contextType = Context;
