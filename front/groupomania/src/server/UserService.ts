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

export async function addPost(
  server: AxiosInstance,
  data: {
    email: string;
    login: string;
    password: string;
  }
): Promise<AxiosResponse> {
  return server.post("/users", data);
}

export async function updatePost(
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

export async function deletePost(server: AxiosInstance, id: number) {
  return server.delete(`/users/${id}`);
}
