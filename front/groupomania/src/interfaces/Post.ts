export default interface Post {
  id: number;
  authorId: number;
  author: string;
  authorAvatarUrl: string | null;
  title: string;
  mediaUrl: string | null;
  description: string | null;
  tags: string[];
  publishDate: Date;
  lastModificationDate: Date | null;
  upVoteCount: number | null;
  downVoteCount: number | null;
  commentCount: number | null;
}
