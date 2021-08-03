import { Department } from '../models/Department';
import dao from '../dao/DepartmentDao';
import ServiceResponse from '../common/ServiceResponse';
import utils from '../common/utils';

export default {
  async getDepartments(filters?: any): Promise<ServiceResponse<Department[]>> {
    return { status: 200, result: await dao.getDepartments(filters) };
  },

  async getDepartment(id: number): Promise<ServiceResponse<Department>> {
    const department = await dao.getDepartment(id);

    if (!department) {
      return { status: 404, result: { message: `Department '${id}' not found` } };
    }

    return { status: 200, result: department };
  },

  async createDepartment(department: Department): Promise<ServiceResponse<Department>> {
    const name = utils.capitalizeText(department.name);

    if ((await dao.getDepartments({ name })).length > 0) {
      return { status: 400, result: { message: `Department '${name}' already exists` } };
    }

    if ((await dao.createDepartment({ name })).length < 1) {
      return { status: 400, result: { message: `Unable to create department '${name}'` } };
    }

    return { status: 201, result: { message: `Department '${name}' added` } };
  },

  async updateDepartment(
    id: number,
    department: Department,
  ): Promise<ServiceResponse<Department[]>> {
    const name = utils.capitalizeText(department.name);
    const existingDepartment = await dao.getDepartment(id as number);
    if (!existingDepartment) {
      return { status: 404, result: { message: `department '${id}' not found` } };
    }

    if ((await dao.getDepartments({ name })).length > 0) {
      return { status: 400, result: { message: `department '${name}' already exists` } };
    }

    if ((await dao.updateDepartment(id as number, { name })).length === 0) {
      return { status: 500, result: { message: `Unable to update department '${id}'` } };
    }

    return { status: 200, result: { message: `Department '${name}' updated` } };
  },

  async deleteDepartment(id: number): Promise<ServiceResponse<number[]>> {
    const department = await dao.getDepartment(id);
    if (!department) {
      return { status: 404, result: { message: `department '${id}' not found` } };
    }

    if ((await dao.deleteDepartment(id)).length === 0) {
      return { status: 500, result: { message: `Unable to delete department '${id}'` } };
    }
    return { status: 200, result: { message: `Department '${id}' deleted` } };
  },
};
