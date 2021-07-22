import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import assert from 'assert';

assert(process.env.TOKEN_KEY);

export default function authLevelGenerator(requiredPriviledge: number = 0) {
  return (req: Request, res: Response, next: any) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const { id, priviledge } = jwt.verify(token ?? '', process.env.TOKEN_KEY as string) as any;
      if (req.body.id && req.body.id !== id) {
        throw new Error('Invalid token');
      }

      if (requiredPriviledge && (!priviledge || requiredPriviledge > priviledge)) {
        throw new Error('Unautorized operation');
      }

      req.user = { id, priviledge };

      next();
    } catch (error) {
      res.status(401).send(error);
    }
  };
}
