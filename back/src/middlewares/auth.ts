import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import assert from 'assert';

assert(process.env.TOKEN_KEY);

export default function authLevelGenerator(requiredPrivilege: number = 0) {
  return (req: Request, res: Response, next: any) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const { id, privilege } = jwt.verify(token ?? '', process.env.TOKEN_KEY as string) as any;
      if (req.body.id && req.body.id !== id) {
        throw new Error('Invalid token');
      }

      if (requiredPrivilege && (!privilege || requiredPrivilege > privilege)) {
        throw new Error('Unautorized operation');
      }

      req.user = { id, privilege };

      next();
    } catch (error) {
      res.status(401).send(error);
    }
  };
}
