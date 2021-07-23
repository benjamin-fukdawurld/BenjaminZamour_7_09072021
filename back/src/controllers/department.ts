import { Request, Response } from 'express';
import pool from '../database';
import { Department } from '../models/Department';

class DepartmentController {
  private static formatName(name: string): string {
    return name
      .trim()
      .replace(/ +/g, ' ')
      .split(' ')
      .map((s: string): string => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
  }

  private static async queryDepartment(id: number): Promise<Department | null> {
    const department = await pool.query('SELECT * FROM department WHERE id = $1;', [id]);

    if (!department || department?.rows.length === 0) {
      return null;
    }

    return department.rows[0];
  }

  public async getDepartments(req: Request, res: Response) {
    try {
      const departments = await pool.query('SELECT * FROM department;');
      res.status(200).send(departments?.rows);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get department list' });
      console.error(JSON.stringify(err));
    }
  }

  public async getDepartment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const department = DepartmentController.queryDepartment(parseFloat(id));

      if (!department) {
        res.status(404).send(`Department '${id}' not found`);
        return;
      }

      res.status(200).send(department);
    } catch (err) {
      res.status(500).send({ message: 'Unable to get this department' });
      console.error(JSON.stringify(err));
    }
  }

  public async addDepartment(req: Request, res: Response) {
    let { name } = req.body;
    if (!name) {
      res.send(400).send({ message: 'Missing department name' });
      return;
    }

    name = DepartmentController.formatName(name);

    try {
      await pool.query('INSERT INTO department(name) VALUES ($1)', [name]);
      res.status(201).send({ message: `Department '${name}' added` });
    } catch (err) {
      res.status(500).send({ message: `Department '${name}' insertion failed` });
      console.error(JSON.stringify(err));
    }
  }

  public async updateDepartment(req: Request, res: Response) {
    const { id, name } = req.body as Department;
    try {
      const formattedName = DepartmentController.formatName(name);
      const department = await DepartmentController.queryDepartment(id);
      if (!department) {
        res.status(404).send({ message: `department '${id}' not found` });
        return;
      }

      await pool.query('UPDATE department SET name = $2 WHERE id = $1;', [id, formattedName]);
      res.status(200).send({ message: `Department '${formattedName}' updated` });
    } catch (err) {
      res.status(500).send({ message: 'Unable to update this department' });
      console.error(JSON.stringify(err));
    }
  }

  public async deleteDepartment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const department = await DepartmentController.queryDepartment(parseFloat(id));
      if (!department) {
        res.status(404).send({ message: `department '${id}' not found` });
        return;
      }

      await pool.query('DELETE FROM department WHERE id = $1;', [id]);
      res.status(200).send({ message: `Department '${id}' deleted` });
    } catch (err) {
      res.status(500).send({ message: 'Unable to delete this department' });
      console.error(JSON.stringify(err));
    }
  }
}

const controller = new DepartmentController();

export default controller;
