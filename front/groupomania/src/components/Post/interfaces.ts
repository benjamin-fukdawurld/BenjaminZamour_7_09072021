import { ElementType } from "react";
import CommentModel from "../../interfaces/Comment";
import PostModel from "../../interfaces/Post";
import Vote from "../../interfaces/Vote";

export interface PostHeaderProps {
  authorId: number;
  author: string;
  authorAvatarUrl?: string | null;
  title: string;
  isEditable?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export interface PostProps {
  post: PostModel;
  onVote: (value: number) => void;
  vote?: Vote;
}

export interface PostState {
  comments: CommentModel[];
  commentDelta: number;
  newComment: CommentModel | null;
}

export interface PostActionProps {
  active?: boolean;
  count: number | null;
  label: string;
  icon: ElementType;
  onClick: () => void;
}

export interface PostActionsProps {
  liked: boolean;
  disliked: boolean;
  upVoteCount: number | null;
  downVoteCount: number | null;
  commentCount: number | null;
  onLike: () => void;
  onDislike: () => void;
  onComment: () => void;
}

export interface PostDataProps {
  mediaUrl: string | null;
  title: string | null;
  description: string | null;
  tags: string[] | null;
}
