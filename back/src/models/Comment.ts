export interface Comment {
  id?: number;
  employeeId?: number;
  postId?: number;
  publishDate?: Date;
  lastModificationDate?: Date;
  respondTo?: number;
  text?: string;
}
