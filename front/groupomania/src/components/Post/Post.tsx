import { Component } from "react";
import Badge from "react-bootstrap/Badge";

export interface PostProps {
  id: number;
  userId: number;
  title: string;
  mediaUrl: string | null;
  description: string | null;
  tags: string[];
  publishDate: Date;
  lastModificationDate: Date | null;
}

export interface PostState {}

export default class Post extends Component<PostProps, PostState> {
  render() {
    return (
      <article className="post" data-id={this.props.id}>
        <h2 className="post__title">{this.props.title}</h2>
        {this.props.mediaUrl && (
          <img
            className="post__image"
            src={this.props.mediaUrl}
            alt={this.props.title}
          />
        )}
        {this.props.description && (
          <p className="post__description">{this.props.description}</p>
        )}
        <div className="post__tags">
          {this.props.tags.map((tag: string, index: number) => {
            return (
              <Badge bg="primary" className="mx-1" key={index}>
                {tag}
              </Badge>
            );
          })}
        </div>
      </article>
    );
  }
}
