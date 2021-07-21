import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import assert from 'assert';

import pool from '../database';
import { User } from '../models/User';

assert(process.env.TOKEN_KEY);

class UserController {
  private static async queryUser(id: number): Promise<User | null> {
    const user = await pool.query('SELECT id, login FROM employee WHERE id = $1;', [id]);

    if (!user || user?.rows.length === 0) {
      return null;
    }

    return user.rows[0];
  }

  public async getUsers(req: Request, res: Response) {
    try {
      const users = await pool.query('SELECT id, login FROM employee;');
      res.status(200).send(users?.rows);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get user list' });
      console.error(JSON.stringify(err));
    }
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await UserController.queryUser(parseFloat(id));

      if (!user) {
        res.status(404).send(`User '${id}' not found`);
        return;
      }

      res.status(200).send(user);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get this department' });
      console.error(JSON.stringify(err));
    }
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserController.queryUser(parseFloat(id));

      if (!user) {
        res.status(404).send({ message: `user '${id}' not found` });
        return;
      }

      const columns = Object.keys(req.body).filter(
        (column: string) => ['login', 'email', 'password'].includes(column) && req.body[column],
      );

      if (columns.includes('password')) {
        await argon2.verify(user.password, req.body.oldPassword);
      }

      await pool.query(
        `UPDATE employee SET ${columns
          .map((col: string, index: number) => `${col} = $${index + 2}`)
          .join(', ')} WHERE id = $1;`,
        [id, ...columns.map((column: string) => req.body[column])],
      );
      res.status(200).send({ message: `Department '${req.body.login}' updated` });
    } catch (err) {
      res.status(500).send({ message: 'Unable to update this user' });
      console.error(JSON.stringify(err));
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await UserController.queryUser(parseFloat(id));

      if (!user) {
        res.status(404).send({ message: `user '${id}' not found` });
        return;
      }

      await pool.query('DELETE FROM employee WHERE id = $1', [id]);
      res.status(200).send({ message: `User '${id}' deleted` });
    } catch (err) {
      res.status(500).send({ message: 'Unable to delete this user' });
      console.error(JSON.stringify(err));
    }
  }

  public async signup(req: Request, res: Response) {
    const { email, login, password } = req.body as User;

    argon2
      .hash(password, {
        type: argon2.argon2id,
      })
      .then(async (hash: string) => {
        await pool.query('INSERT INTO employee(login, email, password) VALUES ($1, $2, $3)', [
          login,
          email,
          hash,
        ]);

        res.status(201).send({ message: 'user created' });
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  public async login(req: Request, res: Response) {
    const { email, login, password } = req.body;

    const users = await pool.query(
      `SELECT id, login, email, password FROM employee WHERE ${
        email ? 'email = $1' : 'login = $1'
      };`,
      [email ?? login],
    );

    if (!users || !users?.rows?.length) {
      res.status(404).send({ message: 'user not found' });
      return;
    }

    const user = users.rows[0];

    argon2
      .verify(user.password, password)
      .then((result) => {
        if (result) {
          res.status(200).send({
            message: 'User logged',
            userId: user.id,
            token: jwt.sign(
              { id: user.id, priviledge: user.priviledge },
              process.env.TOKEN_KEY as string,
              { expiresIn: process.env.TOKEN_DURATION },
            ),
          });
        } else {
          setTimeout(() => res.status(401).send({ message: 'Connection data invalid' }), 3000);
        }
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
}

const controller = new UserController();

export default controller;
