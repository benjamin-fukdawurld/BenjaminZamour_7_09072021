import { Request, Response } from 'express';
import service from '../services/DepartmentService';
import logger from '../common/logger';

export class DepartmentController {
  public async getDepartments(req: Request, res: Response) {
    try {
      const serviceResponse = await service.getDepartments();
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
      logger.error(JSON.stringify(err));
    }
  }

  public async getDepartment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getDepartment(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
      logger.error(JSON.stringify(err));
    }
  }

  public async addDepartment(req: Request, res: Response) {
    const { name } = req.body;
    if (!name) {
      res.send(400).send({ message: 'Missing department name' });
      return;
    }

    try {
      const serviceResponse = await service.createDepartment({ name });
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
      logger.error(JSON.stringify(err));
    }
  }

  public async updateDepartment(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    if (!id || !name) {
      res.status(400).send({ message: 'Missing information' });
      return;
    }

    try {
      const serviceResponse = await service.updateDepartment(parseFloat(id), { name });
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
      logger.error(JSON.stringify(err));
    }
  }

  public async deleteDepartment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const serviceResponse = await service.getDepartment(parseFloat(id));
      res.status(serviceResponse.status).send(serviceResponse.result);
    } catch (err) {
      res.status(500).send(err);
      logger.error(JSON.stringify(err));
    }
  }
}

const controller = new DepartmentController();

export default controller;
