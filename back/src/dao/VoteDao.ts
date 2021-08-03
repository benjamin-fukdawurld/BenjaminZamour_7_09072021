import { Vote } from '../models/Vote';
import { knexDb } from '../database';

export default {
  async getVotes(filters?: any): Promise<Vote[]> {
    const votes = knexDb.select().from<Vote>('vote');
    if (filters) {
      votes.where(filters);
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
          query.orWhere({ postId });
        }

        if (commentId) {
          query.orWhere({ commentId });
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
