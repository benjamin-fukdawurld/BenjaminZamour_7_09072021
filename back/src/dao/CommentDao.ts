import { Comment } from '../models/Comment';
import { knexDb } from '../database';

export default {
  async getComments(filters?: any): Promise<Comment[]> {
    const comments = knexDb
      .select(knexDb.raw('comment.*, employee.login, employee.avatar_url'))
      .from<Comment>('comment')
      .leftJoin('employee', 'comment.employee_id', 'employee.id');
    if (filters) {
      comments.where(filters);
    }

    return comments;
  },

  async getComment(id: number): Promise<Comment | null> {
    const comments = await knexDb
      .select(knexDb.raw('comment.*, employee.login, employee.avatar_url'))
      .from<Comment>('comment')
      .leftJoin('employee', 'comment.employee_id', 'employee.id')
      .where({ 'comment.id': id });
    if (!comments.length) {
      return null;
    }

    const result = comments[0];
    return result as Comment;
  },

  async createComment(comment: Comment): Promise<Comment[]> {
    return knexDb.insert(comment).into('comment').returning(['id']);
  },

  async updateComment(id: number, text: string): Promise<Comment[]> {
    return knexDb('comment').where({ id }).update({ text }).returning(['id']);
  },

  async deleteComment(id: number): Promise<number[]> {
    return knexDb('comment').where({ id }).del(['id']);
  },
};
