import { Request, Response } from 'express';
import service from '../services/VoteService';
import { Vote } from '../models/Vote';
import logger from '../common/logger';
import { parseQueryOptions } from '../database';

export class VoteController {
  public async getVotes(req: Request, res: Response) {
    try {
      const serviceResponse = await service.getVotes(parseQueryOptions(req.query));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get vote list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async getVote(req: Request, res: Response) {
    const { employeeId, commentId, postId } = req.params;
    try {
      const serviceResponse = await service.getVote(
        parseFloat(employeeId),
        parseFloat(postId) ?? null,
        parseFloat(commentId) ?? null,
      );
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({
        message: `Unable to get vote ${JSON.stringify({ employeeId, commentId, postId })}`,
      });
      logger.error(JSON.stringify(err));
    }
  }

  public async addVote(req: Request, res: Response) {
    if (!req.body.value) {
      res.send(400).send({ message: 'Missing vote value' });
      return;
    }

    try {
      const serviceResponse = await service.createVote(req.body as Vote);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({
        message: `Unable to add vote ${JSON.stringify(req.body as Vote)}`,
      });
      logger.error(JSON.stringify(err));
    }
  }

  public async updateVote(req: Request, res: Response) {
    const { employeeId, commentId, postId } = req.params;
    const { value } = req.body;
    if (!employeeId || (!commentId && !postId)) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    try {
      const serviceResponse = await service.updateVote(
        parseFloat(employeeId),
        !postId ? null : parseFloat(postId),
        !commentId ? null : parseFloat(commentId),
        value,
      );
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({
        message: `Unable to update vote ${JSON.stringify({ employeeId, commentId, postId })}`,
      });
      logger.error(JSON.stringify(err));
    }
  }

  public async deleteVote(req: Request, res: Response) {
    const { employeeId, commentId, postId } = req.params;
    try {
      const serviceResponse = await service.deleteVote(
        parseFloat(employeeId),
        !postId ? null : parseFloat(postId),
        !commentId ? null : parseFloat(commentId),
      );
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({
        message: `Unable to delete vote ${JSON.stringify({ employeeId, commentId, postId })}`,
      });
      logger.error(JSON.stringify(err));
    }
  }
}

const controller = new VoteController();

export default controller;
