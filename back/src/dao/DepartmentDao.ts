import { Department } from '../models/Department';
import { knexDb } from '../database';

export default {
  async getDepartments(filters?: any): Promise<Department[]> {
    const departments = knexDb.select().from<Department>('department');
    if (filters) {
      departments.where(filters);
    }

    return departments;
  },

  async getDepartment(id: number): Promise<Department | null> {
    const departments = await knexDb.select().from<Department>('department').where({ id });
    if (!departments.length) {
      return null;
    }

    const result = departments[0];
    return result as Department;
  },

  async createDepartment(department: Department): Promise<Department[]> {
    return knexDb.insert(department).into('department').returning(['id', 'name']);
  },

  async updateDepartment(id: number, department: Department): Promise<Department[]> {
    return knexDb('department')
      .where({ id })
      .update({ name: department.name })
      .returning(['id', 'name']);
  },

  async deleteDepartment(id: number): Promise<number[]> {
    return knexDb('department').where({ id }).del(['id']);
  },
};
