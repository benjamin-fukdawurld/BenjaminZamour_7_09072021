export default interface Vote {
  employeeId: number;
  postId?: number | null;
  commentId?: number | null;
  value: number;
}
