export interface Post {
  id?: number;
  employeeId: number;
  title: string;
  mediaUrl?: string;
  tags: string[];
  description?: string;
  publishDate?: Date;
  lastModificationDate?: Date;
}
