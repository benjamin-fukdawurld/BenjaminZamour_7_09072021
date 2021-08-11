import { User } from '../models/User';
import { knexDb, QueryOptions } from '../database';

function getSelectedColumnsString(columns?: string[]): string {
  let selectedColumns: string[] = [];
  if (!columns?.length) {
    selectedColumns = [
      'employee.id',
      'employee.email',
      'employee.login',
      'employee.first_name',
      'employee.last_name',
      'employee.job_title',
      'employee.birth_date',
      'employee.biography',
      'employee.department_id',
      'employee.privilege',
      'employee.avatar_url',
      'department.name as department_name',
    ];
  } else {
    selectedColumns = [...columns.map((col) => `employee.${col}`)];
    if (columns.includes('departmentId')) {
      selectedColumns.push('department.name as department_name');
    }
  }

  return selectedColumns.join(', ');
}

export default {
  async getUsers(options?: QueryOptions): Promise<User[]> {
    const users = knexDb
      .select(knexDb.raw(getSelectedColumnsString(options?.columns)))
      .from<User>('employee')
      .leftJoin('department', 'employee.departmentId', 'department.id');

    if (options?.filters) {
      users.where(options.filters);
    }

    if (options?.limit) {
      users.limit(options.limit);
    }

    if (options?.offset) {
      users.offset(options.offset);
    }

    if (options?.orderBy) {
      users.orderBy(options.orderBy);
    }

    return users;
  },

  async getUser(id: number, columns?: string[]): Promise<User | null> {
    const users = await knexDb
      .select(knexDb.raw(getSelectedColumnsString(columns)))
      .from<User>('employee')
      .leftJoin('department', 'employee.departmentId', 'department.id')
      .where({ 'employee.id': id });
    if (!users.length) {
      return null;
    }

    return users[0];
  },

  async createUser(user: User): Promise<User[]> {
    return knexDb.insert(user).into('employee').returning(['id', 'login']);
  },

  async updateUser(id: number, user: User): Promise<User[]> {
    return knexDb('employee').where({ id }).update(user).returning(['id', 'login']);
  },

  async deleteUser(id: number): Promise<number[]> {
    return knexDb('employee').where({ id }).del(['id']);
  },
};
