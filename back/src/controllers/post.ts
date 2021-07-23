import { Request, Response } from 'express';

import utils from '../common/utils';
import pool from '../database';

import { Post } from '../models/Post';

class PostController {
  private static postEditableColumns(): string[] {
    return ['employeeId', 'title', 'mediaUrl', 'tags', 'description'];
  }

  private static async queryPost(id: number, fields = ['id']): Promise<Post | null> {
    const post = await pool.query(`SELECT ${fields.join(', ')} FROM post WHERE id = $1;`, [id]);

    if (!post || post?.rows.length === 0) {
      return null;
    }

    return post.rows[0];
  }

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
      const posts = await pool.query('SELECT * FROM post;');
      res.status(200).send(posts?.rows);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get post list' });
      console.error(JSON.stringify(err));
    }
  }

  public async getPost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await PostController.queryPost(parseFloat(id), ['*']);
      if (!post) {
        res.status(404).send({ message: 'Post not found' });
        return;
      }

      res.status(200).send(post);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get post list' });
      console.error(JSON.stringify(err));
    }
  }

  public async addPost(req: Request, res: Response) {
    try {
      const postData = PostController.getPostPatchData(req);
      postData.tags = postData?.tags?.join(',');

      const columns = Object.keys(req.body).filter(
        (column: string) =>
          PostController.postEditableColumns().includes(column) && postData[column],
      );

      await pool.query(
        `INSERT INTO post(${columns.join(', ')}, publishDate) VALUES (${columns.map(
          (column: string, index: number) => `$${index + 1}`,
        )}, $${columns.length + 1})`,
        [...columns.map((column: string) => req.body[column]), 'NOW()'],
      );

      res.status(201).send({ message: 'post created' });
    } catch (err) {
      res.status(500).send({ message: 'Unable to create post list' });
      console.error(JSON.stringify(err));
    }
  }

  public async updatePost(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    const post = await PostController.queryPost(parseFloat(id), ['*']);
    if (!post) {
      res.status(404).send({ message: 'Post not found' });
      return;
    }

    const postData = PostController.getPostPatchData(req);
    postData.tags = postData?.tags?.join(',');

    const columns = Object.keys(postData).filter(
      (column: string) => PostController.postEditableColumns().includes(column) && postData[column],
    );

    try {
      await pool.query(
        `UPDATE post SET ${columns
          .map((col: string, index: number) => `${col} = $${index + 2}`)
          .join(', ')} WHERE id = $1;`,
        [id, ...columns.map((column: string) => postData[column])],
      );
      res.status(200).send({ message: `Post '${id}' updated` });
    } catch (err) {
      res.status(500).send({ message: 'Unable to update post list' });
      console.error(JSON.stringify(err));
    }
  }

  public async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    try {
      const post = await PostController.queryPost(parseFloat(id), ['*']);
      if (!post) {
        res.status(404).send({ message: 'Post not found' });
        return;
      }

      await pool.query('DELETE FROM post WHERE id = $1', [id]);
      res.status(200).send({ message: `Post '${id}' deleted` });
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

const controller = new PostController();

export default controller;
