import { Vote } from '../models/Vote';
import { knexDb, QueryOptions } from '../database';

export default {
  async getVotes(options?: QueryOptions): Promise<Vote[]> {
    const votes = knexDb.select().from<Vote>('vote');

    if (options?.filters) {
      votes.where(options.filters);
    }

    if (options?.limit) {
      votes.limit(options.limit);
    }

    if (options?.offset) {
      votes.offset(options.offset);
    }

    if (options?.orderBy) {
      votes.orderBy(options.orderBy);
    }

    return votes;
  },

  async getVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
  ): Promise<Vote | null> {
    const votes = await knexDb
      .select()
      .from<Vote>('vote')
      .where((query: any) => {
        query.where({ employeeId });

        if (postId) {
          query.where({ postId });
        }

        if (commentId) {
          query.where({ commentId });
        }
      });
    if (!votes.length) {
      return null;
    }

    const result = votes[0];
    return result as Vote;
  },

  async createVote(vote: Vote): Promise<Vote[]> {
    return knexDb.insert(vote).into('vote').returning(['employeeId', 'commentId', 'postId']);
  },

  async updateVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
    value: number,
  ): Promise<Vote[]> {
    return knexDb('vote')
      .where({ employeeId, postId, commentId })
      .update({ value })
      .returning(['employeeId', 'postId', 'commentId']);
  },

  async deleteVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
  ): Promise<number[]> {
    return knexDb('vote')
      .where({ employeeId, postId, commentId })
      .del(['employeeId', 'postId', 'commentId']);
  },
};
