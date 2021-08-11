import { Post } from '../models/Post';
import { knexDb, QueryOptions } from '../database';

export default {
  async getPosts(options?: QueryOptions): Promise<Post[]> {
    const posts = knexDb
      .select(
        knexDb.raw(
          [
            'post.*',
            'employee.login as employee_login, employee.avatar_url as employee_avatar_url',
            'up_vote.up_vote_count',
            'down_vote.down_vote_count',
            'comment.comment_count',
          ].join(','),
        ),
      )
      .from<Post>('post')
      .leftJoin('employee', 'post.employee_id', 'employee.id')
      .leftJoin(
        knexDb('vote')
          .select(knexDb.raw('post_id, COUNT(id) as up_vote_count'))
          .where('value', '>', 0)
          .groupBy('postId')
          .as('up_vote'),
        'post.id',
        'up_vote.post_id',
      )
      .leftJoin(
        knexDb('vote')
          .select(knexDb.raw('post_id, COUNT(id) as down_vote_count'))
          .where('value', '<', 0)
          .groupBy('postId')
          .as('down_vote'),
        'post.id',
        'down_vote.post_id',
      )
      .leftJoin(
        knexDb('comment')
          .select(knexDb.raw('post_id, COUNT(id) as comment_count'))
          .groupBy('postId')
          .as('comment'),
        'post.id',
        'comment.post_id',
      );

    if (options?.filters) {
      posts.where(options.filters);
    }

    if (options?.limit) {
      posts.limit(options.limit);
    }

    if (options?.offset) {
      posts.offset(options.offset);
    }

    if (options?.orderBy) {
      posts.orderBy(options.orderBy);
    }

    return posts;
  },

  async getPost(id: number): Promise<Post | null> {
    const posts = await knexDb
      .select(
        knexDb.raw(
          [
            'post.*',
            'employee.login as employee_login, employee.avatar_url as employee_avatar_url',
            'up_vote.up_vote_count',
            'down_vote.down_vote_count',
            'comment.comment_count',
          ].join(','),
        ),
      )
      .from<Post>('post')
      .leftJoin('employee', 'post.employee_id', 'employee.id')
      .leftJoin(
        knexDb('vote')
          .select(knexDb.raw('post_id, COUNT(id) as up_vote_count'))
          .where('value', '>', 0)
          .groupBy('postId')
          .as('up_vote'),
        'post.id',
        'up_vote.post_id',
      )
      .leftJoin(
        knexDb('vote')
          .select(knexDb.raw('post_id, COUNT(id) as down_vote_count'))
          .where('value', '<', 0)
          .groupBy('postId')
          .as('down_vote'),
        'post.id',
        'down_vote.post_id',
      )
      .leftJoin(
        knexDb('comment')
          .select(knexDb.raw('post_id, COUNT(id) as comment_count'))
          .groupBy('postId')
          .as('comment'),
        'post.id',
        'comment.post_id',
      )
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
    const data = Object.fromEntries(
      Object.entries(post).map((entry: [string, any]) => {
        if (entry[0] === 'mediaUrl') {
          if (post.mediaUrl === null) {
            return [entry[0], knexDb.raw('NULL')];
          }
        }
        return entry;
      }),
    );
    return knexDb('post').where({ id }).update(data).returning(['id', 'title']);
  },

  async deletePost(id: number): Promise<number[]> {
    return knexDb('post').where({ id }).del(['id']);
  },
};
