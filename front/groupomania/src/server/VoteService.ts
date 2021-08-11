import { AxiosInstance, AxiosResponse } from "axios";
import Vote from "../interfaces/Vote";

export async function getVotes(
  server: AxiosInstance,
  data: { postId?: number | null; commentId?: number | null }
): Promise<Vote[]> {
  const uri =
    "/votes/" +
    (data.commentId
      ? `comment/${data.commentId}`
      : data.postId
      ? `post/${data.postId}`
      : "");

  const res = await server.get<Vote[]>(uri);

  return res.data;
}

export async function getVote(
  server: AxiosInstance,
  data: {
    employeeId: number;
    postId?: number | null;
    commentId?: number | null;
  }
): Promise<Vote> {
  const uri =
    "/votes/" +
    (data.commentId ? `comment/${data.commentId}/` : `post/${data.postId}/`) +
    `${data.employeeId}`;
  const vote = await server.get<Vote>(uri);

  return vote.data;
}

export async function addVote(
  server: AxiosInstance,
  data: Vote
): Promise<AxiosResponse> {
  return server.post("/votes", data);
}

export async function updateVote(
  server: AxiosInstance,
  data: Vote
): Promise<AxiosResponse> {
  const uri =
    "/votes/" +
    (data.commentId ? `comment/${data.commentId}/` : `post/${data.postId}/`) +
    `${data.employeeId}`;

  return await server.put(uri, { value: data.value });
}

export async function deleteVote(
  server: AxiosInstance,
  data: {
    employeeId: number;
    postId?: number | null;
    commentId?: number | null;
  }
): Promise<AxiosResponse> {
  const uri =
    "/votes/" +
    (data.commentId ? `comment/${data.commentId}/` : `post/${data.postId}/`) +
    `${data.employeeId}`;

  return await server.delete(uri);
}
