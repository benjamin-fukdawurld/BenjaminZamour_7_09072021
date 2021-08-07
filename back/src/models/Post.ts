export interface Post {
  id?: number;
  employeeId?: number;
  employeeLogin?: string;
  employeeAvatarUrl?: string;
  title?: string;
  mediaUrl?: string;
  tags?: string;
  description?: string;
  publishDate?: Date;
  lastModificationDate?: Date;
  upVoteCount?: number;
  downVoteCount?: number;
  commentCount?: number;
}
