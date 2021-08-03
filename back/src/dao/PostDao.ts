import { Post } from '../models/Post';
import { knexDb } from '../database';

export default {
  async getPosts(filters?: any): Promise<Post[]> {
    const posts = knexDb
      .select(knexDb.raw('post.*, employee.login, employee.avatar_url'))
      .from<Post>('post')
      .leftJoin('employee', 'post.employee_id', 'employee.id');
    if (filters) {
      posts.where(filters);
    }

    return posts;
  },

  async getPost(id: number): Promise<Post | null> {
    const posts = await knexDb
      .select(knexDb.raw('post.*, employee.login, employee.avatar_url'))
      .from<Post>('post')
      .leftJoin('employee', 'post.employee_id', 'employee.id')
      .where({ 'post.id': id });
    if (!posts.length) {
      return null;
    }

    const result = posts[0];
    return result as Post;
  },

  async createPost(post: Post): Promise<Post[]> {
    return knexDb.insert(post).into('post').returning(['id', 'title']);
  },

  async updatePost(id: number, post: Post): Promise<Post[]> {
    return knexDb('post').where({ id }).update(post).returning(['id', 'title']);
  },

  async deletePost(id: number): Promise<number[]> {
    return knexDb('post').where({ id }).del(['id']);
  },
};
