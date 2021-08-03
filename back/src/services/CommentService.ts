import { Comment } from '../models/Comment';
import dao from '../dao/CommentDao';
import ServiceResponse from '../common/ServiceResponse';

export default {
  async getComments(filters?: any): Promise<ServiceResponse<Comment[]>> {
    return { status: 200, result: await dao.getComments(filters) };
  },

  async getComment(id: number): Promise<ServiceResponse<Comment>> {
    const comment = await dao.getComment(id);

    if (!comment) {
      return { status: 404, result: { message: `Comment '${id}' not found` } };
    }

    return { status: 200, result: comment };
  },

  async createComment(comment: Comment): Promise<ServiceResponse<Comment>> {
    const result = await dao.createComment(comment);
    if (result.length < 1) {
      return { status: 400, result: { message: `Unable to create comment '${result[0].id}'` } };
    }

    return { status: 201, result: { message: `Comment '${result[0].id}' added` } };
  },

  async updateComment(id: number, text: string): Promise<ServiceResponse<Comment[]>> {
    const existingComment = await dao.getComment(id as number);
    if (!existingComment) {
      return { status: 404, result: { message: `comment '${id}' not found` } };
    }

    if ((await dao.updateComment(id as number, text)).length === 0) {
      return { status: 500, result: { message: `Unable to update comment '${id}'` } };
    }

    return { status: 200, result: { message: `Comment '${id}' updated` } };
  },

  async deleteComment(id: number): Promise<ServiceResponse<number[]>> {
    const comment = await dao.getComment(id);
    if (!comment) {
      return { status: 404, result: { message: `comment '${id}' not found` } };
    }

    if ((await dao.deleteComment(id)).length === 0) {
      return { status: 500, result: { message: `Unable to delete comment '${id}'` } };
    }
    return { status: 200, result: { message: `Comment '${id}' deleted` } };
  },
};
