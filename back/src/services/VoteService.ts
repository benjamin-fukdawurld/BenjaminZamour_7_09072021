import { Vote } from '../models/Vote';
import dao from '../dao/VoteDao';
import ServiceResponse from '../common/ServiceResponse';

export default {
  async getVotes(filters?: any): Promise<ServiceResponse<Vote[]>> {
    return { status: 200, result: await dao.getVotes(filters) };
  },

  async getVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
  ): Promise<ServiceResponse<Vote>> {
    const vote = await dao.getVote(employeeId, postId, commentId);

    if (!vote) {
      return {
        status: 404,
        result: { message: `Vote '${{ employeeId, postId, commentId }}' not found` },
      };
    }

    return { status: 200, result: vote };
  },

  async createVote(vote: Vote): Promise<ServiceResponse<Vote>> {
    const result = await dao.createVote(vote);
    if (result.length < 1) {
      return {
        status: 400,
        result: { message: 'Unable to create vote' },
      };
    }

    const { employeeId, postId, commentId } = result[0];
    return {
      status: 201,
      result: { message: `Vote '${{ employeeId, postId, commentId }}' added` },
    };
  },

  async updateVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
    value: number,
  ): Promise<ServiceResponse<Vote[]>> {
    if (value === 0) {
      return {
        status: 400,
        result: { message: 'Invalid value' },
      };
    }

    const existingVote = await dao.getVote(employeeId, postId, commentId);
    if (!existingVote) {
      return {
        status: 404,
        result: { message: `vote '${{ employeeId, postId, commentId }}' not found` },
      };
    }

    if ((await dao.updateVote(employeeId, postId, commentId, value)).length === 0) {
      return {
        status: 500,
        result: { message: `Unable to update vote '${{ employeeId, postId, commentId }}'` },
      };
    }

    return {
      status: 200,
      result: { message: `Vote '${{ employeeId, postId, commentId }}' updated` },
    };
  },

  async deleteVote(
    employeeId: number,
    postId: number | null,
    commentId: number | null,
  ): Promise<ServiceResponse<number[]>> {
    const vote = await dao.getVote(employeeId, postId, commentId);
    if (!vote) {
      return {
        status: 404,
        result: { message: `vote '${{ employeeId, postId, commentId }}' not found` },
      };
    }

    if ((await dao.deleteVote(employeeId, postId, commentId)).length === 0) {
      return {
        status: 500,
        result: { message: `Unable to delete vote '${{ employeeId, postId, commentId }}'` },
      };
    }
    return {
      status: 200,
      result: { message: `Vote '${{ employeeId, postId, commentId }}' deleted` },
    };
  },
};
