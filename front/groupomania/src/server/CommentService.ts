import { AxiosInstance, AxiosResponse } from "axios";
import Comment from "../interfaces/Comment";

import queryString from "query-string";

export async function getComments(
  server: AxiosInstance,
  data: { postId?: number | null; employeeId?: number | null },
  options?: { offset?: number; respondTo: number | null }
): Promise<Comment[]> {
  const query = queryString.stringify({
    limit: 10,
    offset: options?.offset ?? 0,
    respondTo: options?.respondTo,
    noRespond: options?.respondTo ? undefined : 1,
    postId: data.postId,
    employeeId: data.employeeId,
  });

  const res = await server.get<Comment[]>(`/comments?${query}`);

  return res.data;
}

export async function getComment(
  server: AxiosInstance,
  id: number
): Promise<Comment> {
  const vote = await server.get<Comment>(`/comments/${id}`);

  return vote.data;
}

export async function addComment(
  server: AxiosInstance,
  data: {
    employeeId: number;
    postId: number;
    respondTo?: number;
    text: string;
  }
): Promise<AxiosResponse> {
  return server.post(`/comments`, data);
}

export async function updateComment(
  server: AxiosInstance,
  id: number,
  text: string
): Promise<AxiosResponse> {
  return await server.patch(`comments/${id}`, { text });
}

export async function deleteComment(
  server: AxiosInstance,
  id: number
): Promise<AxiosResponse> {
  return await server.delete(`comments/${id}`);
}
