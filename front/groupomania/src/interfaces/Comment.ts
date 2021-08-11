export default interface Comment {
  id?: number;
  employeeId: number;
  postId: number;
  respondTo?: number | null;
  publishDate?: Date;
  lastModificationDate?: Date | null;
  text: string;
  login: string;
  avatarUrl: string | null;
}
