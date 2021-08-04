import { Request, Response } from 'express';
import argon2 from 'argon2';
import assert from 'assert';

import { User } from '../models/User';
import logger from '../common/logger';
import service from '../services/UserService';
import { parseQueryOptions } from '../database';

assert(process.env.TOKEN_KEY);
assert(process.env.ARGON2_SALT);

class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const serviceResponse = await service.getUsers(parseQueryOptions(req.query));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get user list' });
      logger.error(JSON.stringify(err));
    }
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getUser(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get this user' });
      logger.error(JSON.stringify(err));
    }
  }

  public async getUserProfile(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getUserProfile(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get this user' });
      logger.error(JSON.stringify(err));
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const serviceResponse = await service.updateUser(parseFloat(id), req.body as User);
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to update this user' });
      logger.error(JSON.stringify(err));
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const serviceResponse = await service.deleteUser(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send({ message: 'Unable to delete this user' });
      logger.error(JSON.stringify(err));
    }
  }

  public async signUp(req: Request, res: Response) {
    const { email, login, password } = req.body as User;

    try {
      const hash = await argon2.hash(password, {
        salt: Buffer.from(process.env.ARGON2_SALT as string, 'utf-8'),
        type: argon2.argon2id,
      });

      const serviceResponse = await service.createUser({ email, login, password: hash });
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  public async logIn(req: Request, res: Response) {
    const { email, login, password } = req.body;
    try {
      const serviceResponse = await service.logIn({ email, login, password });
      if (serviceResponse.status === 200) {
        res.status(serviceResponse.status).send(serviceResponse.result);
        return;
      }

      setTimeout(() => res.status(serviceResponse.status).send(serviceResponse.result), 3000);
    } catch (err) {
      res.status(500).send({ message: 'Unable to log this user' });
      logger.error(JSON.stringify(err));
    }
  }
}

const controller = new UserController();

export default controller;
