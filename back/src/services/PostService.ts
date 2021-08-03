import { Post } from '../models/Post';
import dao from '../dao/PostDao';
import ServiceResponse from '../common/ServiceResponse';
import { QueryOptions } from '../database';

export default {
  async getPosts(options?: QueryOptions): Promise<ServiceResponse<Post[]>> {
    return { status: 200, result: await dao.getPosts(options) };
  },

  async getPost(id: number): Promise<ServiceResponse<Post>> {
    const post = await dao.getPost(id);

    if (!post) {
      return { status: 404, result: { message: `Post '${id}' not found` } };
    }

    return { status: 200, result: post };
  },

  async createPost(post: Post): Promise<ServiceResponse<Post>> {
    if ((await dao.createPost(post)).length < 1) {
      return { status: 400, result: { message: `Unable to create post '${post.title}'` } };
    }

    return { status: 201, result: { message: `Post '${post.title}' added` } };
  },

  async updatePost(id: number, post: Post): Promise<ServiceResponse<Post[]>> {
    const existingPost = await dao.getPost(id as number);
    if (!existingPost) {
      return { status: 404, result: { message: `post '${id}' not found` } };
    }

    if ((await dao.updatePost(id as number, post)).length === 0) {
      return { status: 500, result: { message: `Unable to update post '${id}'` } };
    }

    return { status: 200, result: { message: `Post '${post.title}' updated` } };
  },

  async deletePost(id: number): Promise<ServiceResponse<number[]>> {
    const post = await dao.getPost(id);
    if (!post) {
      return { status: 404, result: { message: `post '${id}' not found` } };
    }

    if ((await dao.deletePost(id)).length === 0) {
      return { status: 500, result: { message: `Unable to delete post '${id}'` } };
    }
    return { status: 200, result: { message: `Post '${id}' deleted` } };
  },
};
