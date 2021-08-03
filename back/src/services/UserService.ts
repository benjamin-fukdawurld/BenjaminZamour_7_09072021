import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';
import dao from '../dao/UserDao';
import ServiceResponse from '../common/ServiceResponse';
import utils from '../common/utils';
import DepartmentDao from '../dao/DepartmentDao';
import { QueryOptions } from '../database';

async function userLoginOrEmailExists(user: User): Promise<boolean> {
  const existingUsers = await dao.getUsers({
    filters: (query: any) => {
      if (user.login) {
        query.orWhere('login', user.login);
      }
      if (user.email) {
        query.orWhere('email', user.email);
      }
    },
  });

  return existingUsers.length > 0;
}

async function getUsers(options?: QueryOptions): Promise<ServiceResponse<User[]>> {
  return { status: 200, result: await dao.getUsers(options) };
}

async function getUser(id: number): Promise<ServiceResponse<User>> {
  const user = await dao.getUser(id, ['id', 'login']);

  if (!user) {
    return { status: 404, result: { message: `User '${id}' not found` } };
  }

  return { status: 200, result: user };
}

async function getUserProfile(id: number): Promise<ServiceResponse<User>> {
  const user = await dao.getUser(id);

  if (!user) {
    return { status: 404, result: { message: `User '${id}' not found` } };
  }

  return { status: 200, result: user };
}

async function createUser(user: User): Promise<ServiceResponse<User>> {
  if (await userLoginOrEmailExists(user)) {
    return {
      status: 400,
      result: { message: `User login: '${user.login}' or email: '${user.email}' already exists` },
    };
  }

  const userCopy = utils.deepCopy(user);
  delete userCopy.id;
  if ((await dao.createUser(userCopy)).length < 1) {
    return { status: 400, result: { message: `Unable to create user '${user.login}'` } };
  }

  return { status: 201, result: { message: `User '${user.login}' added` } };
}

async function updateUser(id: number, user: User): Promise<ServiceResponse<User[]>> {
  const existingUser = await dao.getUser(id as number);
  if (!existingUser) {
    return { status: 404, result: { message: `user '${id}' not found` } };
  }

  if (user.email || user.login) {
    if (await userLoginOrEmailExists(user)) {
      return {
        status: 400,
        result: { message: `User login: '${user.login}' or email: '${user.email}' already exists` },
      };
    }
  }
  const userCopy = utils.deepCopy(user);
  delete userCopy.id;
  if (userCopy.departmentName && !userCopy.departmentId) {
    const department = await DepartmentDao.getDepartments({
      filters: { name: userCopy.departmentName },
    });
    if (department?.length !== 1) {
      return {
        status: 404,
        result: {
          message: `Unable to update user '${id}': department '${userCopy.departmentName}' does not exist`,
        },
      };
    }

    userCopy.departmentId = department[0].id;
    delete userCopy.departmentName;
  }

  const updatedUsers = await dao.updateUser(id as number, userCopy);
  if (updatedUsers.length === 0) {
    return { status: 500, result: { message: `Unable to update user '${id}'` } };
  }

  return { status: 200, result: { message: `User '${updatedUsers[0].login}' updated` } };
}

async function deleteUser(id: number): Promise<ServiceResponse<number[]>> {
  const user = await dao.getUser(id);
  if (!user) {
    return { status: 404, result: { message: `user '${id}' not found` } };
  }

  if ((await dao.deleteUser(id)).length === 0) {
    return { status: 500, result: { message: `Unable to delete user '${id}'` } };
  }
  return { status: 200, result: { message: `User '${id}' deleted` } };
}

async function signUp(email: string, login: string, password: string) {
  const hash = await argon2.hash(password, {
    salt: Buffer.from(process.env.ARGON2_SALT as string, 'utf-8'),
    type: argon2.argon2id,
  });

  return createUser({ email, login, password: hash });
}

async function logIn(user: User) {
  const users = await dao.getUsers({
    columns: ['id', 'login', 'email', 'password', 'privilege'],
    filters: (query: any) => {
      if (user.login) {
        query.orWhere('login', user.login);
      }
      if (user.email) {
        query.orWhere('email', user.email);
      }
    },
  });

  if (!users || !users?.length) {
    return { status: 404, result: { message: 'user not found' } };
  }

  const passwordValid = await argon2.verify(users[0].password, user.password);
  if (!passwordValid) {
    return { status: 401, result: { message: 'Connection data invalid' } };
  }

  return {
    status: 200,
    result: {
      message: 'User logged',
      userId: user.id,
      token: jwt.sign(
        { id: users[0].id, privilege: users[0].privilege },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: process.env.TOKEN_DURATION,
        },
      ),
    },
  };
}

export default {
  getUsers,
  getUser,
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
  signUp,
  logIn,
};
