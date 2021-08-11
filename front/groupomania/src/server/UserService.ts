import { AxiosInstance, AxiosResponse } from "axios";
import User from "../interfaces/User";

export async function getUsers(server: AxiosInstance): Promise<User[]> {
  const res = await server.get("/users");

  return res.data.map(
    (user: any): User => ({
      id: user.id,
      email: user.email,
      login: user.login,
      privilege: user.privilege,
      avatarUrl: user.avatarUrl ?? null,
      firstName: user.firstName ?? null,
      lastName: user.lastName ?? null,
      jobTitle: user.jobTitle ?? null,
      birthDate: user.birthDate ? new Date(user.birthDate) : null,
      biography: user.biography ?? null,
      departmentId: user.departmentId ?? null,
      departmentName: user.departmentName ?? null,
    })
  );
}

export async function getUser(
  server: AxiosInstance,
  id: number
): Promise<User> {
  const res = await server.get(`/users/${id}`);
  const user = res.data;

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    privilege: user.privilege,
    avatarUrl: user.avatarUrl ?? null,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    jobTitle: user.jobTitle ?? null,
    birthDate: user.birthDate ? new Date(user.birthDate) : null,
    biography: user.biography ?? null,
    departmentId: user.departmentId ?? null,
    departmentName: user.departmentName ?? null,
  };
}

export async function getUserProfile(
  server: AxiosInstance,
  id: number
): Promise<User> {
  const res = await server.get(`/users/${id}/profile`);
  const user = res.data;

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    privilege: user.privilege,
    avatarUrl: user.avatarUrl ?? null,
    firstName: user.firstName ?? null,
    lastName: user.lastName ?? null,
    jobTitle: user.jobTitle ?? null,
    birthDate: user.birthDate ? new Date(user.birthDate) : null,
    biography: user.biography ?? null,
    departmentId: user.departmentId ?? null,
    departmentName: user.departmentName ?? null,
  };
}

export async function updateUser(
  server: AxiosInstance,
  id: number,
  data:
    | {
        email?: string;
        login?: string;
        privilege?: number;
        firstName?: string;
        lastName?: string;
        jobTitle?: string;
        birthDate?: string;
        biography?: string;
        departmentId?: number;
      }
    | { image: any; data: string }
): Promise<AxiosResponse> {
  return server.patch(`/users/${id}`, data);
}

export async function logIn(
  server: AxiosInstance,
  data: { login?: string; email?: string; password: string }
) {
  const res = await server.post("/users/login", data);

  return {
    userId: res.data.userId as number,
    token: res.data.token as string,
    login: res.data.login as string,
    privilege: res.data.privilege as number,
    avatarUrl: res.data.avatarUrl as string,
  };
}

export async function signUp(
  server: AxiosInstance,
  data: { login: string; email: string; password: string }
): Promise<AxiosResponse> {
  return server.post("/users/signup", data);
}

export async function deleteUser(
  server: AxiosInstance,
  id: number
): Promise<AxiosResponse> {
  return server.delete(`/users/${id}`);
}
