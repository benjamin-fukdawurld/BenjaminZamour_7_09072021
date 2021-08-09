import { ElementType } from "react";
import PostModel from "../../interfaces/Post";
import Vote from "../../interfaces/Vote";

export interface PostHeaderProps {
  authorId: number;
  author: string;
  authorAvatarUrl?: string | null;
  title: string;
}

export interface PostProps {
  post: PostModel;
  onVote: (value: number) => void;
  vote?: Vote;
}

export interface PostState {
  liked: boolean;
  disliked: boolean;
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
