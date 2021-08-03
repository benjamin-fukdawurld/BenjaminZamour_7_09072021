import { Request, Response } from 'express';

import service from '../services/PostService';
import utils from '../common/utils';
import logger from '../common/logger';
import { parseQueryOptions } from '../database';

class PostController {
  private static postEditableColumns = ['employeeId', 'title', 'mediaUrl', 'tags', 'description'];

  private static getPostPatchData(req: Request) {
    if (req.file) {
      return {
        ...JSON.parse(req.body.post),
        mediaUrl: utils.getMediaUrl(req),
      };
    }

    return req.body;
  }

  public async getPosts(req: Request, res: Response) {
    try {
      const serviceResponse = await service.getPosts(parseQueryOptions(req.query));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get post list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async getPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getPost(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: `Unable to get post ${id}` });
      logger.error(JSON.stringify(err));
    }
  }

  public async addPost(req: Request, res: Response) {
    try {
      const post = Object.fromEntries(
        Object.entries(PostController.getPostPatchData(req)).filter(([key]) =>
          PostController.postEditableColumns.includes(key),
        ),
      );

      const serviceResponse = await service.createPost(post);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to create post' });
      logger.error(JSON.stringify(err));
    }
  }

  public async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    const post = Object.fromEntries(
      Object.entries(PostController.getPostPatchData(req)).filter(([key]) =>
        PostController.postEditableColumns.includes(key),
      ),
    );

    try {
      const serviceResponse = await service.updatePost(parseFloat(id), post);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: `Unable to update post ${id}` });
      logger.error(JSON.stringify(err));
    }
  }

  public async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    try {
      const serviceResponse = await service.deletePost(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: `Unable to delete post ${id}` });
      logger.error(JSON.stringify(err));
    }
  }
}

const controller = new PostController();

export default controller;
