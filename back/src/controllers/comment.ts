import { Request, Response } from 'express';
import service from '../services/CommentService';
import logger from '../common/logger';

export class CommentController {
  public async getComments(req: Request, res: Response) {
    const { employeeId, postId, respondTo } = req.query;

    const filter =
      !!employeeId || !!postId || !!respondTo
        ? (query: any) => {
            if (employeeId) {
              query.orWhere({ employeeId });
            }

            if (postId) {
              query.orWhere({ postId });
            }

            if (respondTo) {
              query.orWhere({ respondTo });
            }
          }
        : undefined;

    try {
      const serviceResponse = await service.getComments(filter);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get comment list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async getComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getComment(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get comment list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async addComment(req: Request, res: Response) {
    try {
      const serviceResponse = await service.createComment(req.body);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get comment list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async updateComment(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    try {
      const serviceResponse = await service.updateComment(parseFloat(id), text);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get comment list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.deleteComment(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get comment list' });
      logger.error(JSON.stringify(err));
    }
  }
}

const controller = new CommentController();

export default controller;
