import { AxiosInstance, AxiosResponse } from "axios";
import Post from "../interfaces/Post";

export async function getPosts(server: AxiosInstance): Promise<Post[]> {
  const res = await server.get("/posts");

  return res.data.map(
    (post: any): Post => ({
      id: post.id,
      authorId: post.employeeId,
      author: post.employeeLogin,
      authorAvatarUrl: post.employeeAvatarUrl,
      title: post.title,
      mediaUrl: post.mediaUrl,
      tags: post.tags?.split(",") ?? [],
      description: post.description,
      publishDate: new Date(post.publishDate),
      lastModificationDate: post.lastModificationDate
        ? new Date(post.lastModificationDate)
        : null,
      upVoteCount: post.upVoteCount,
      downVoteCount: post.downVoteCount,
      commentCount: post.commentCount,
    })
  );
}

export async function getPost(
  server: AxiosInstance,
  id: number
): Promise<Post> {
  const post = await server.get(`/posts/${id}`);

  return {
    id: post.data.id,
    authorId: post.data.employeeId,
    author: post.data.employeeLogin,
    authorAvatarUrl: post.data.employeeAvatarUrl,
    title: post.data.title,
    mediaUrl: post.data.mediaUrl,
    tags: post.data.tags?.split(",") ?? [],
    description: post.data.description,
    publishDate: new Date(post.data.publishDate),
    lastModificationDate: post.data.lastModificationDate
      ? new Date(post.data.lastModificationDate)
      : null,
    upVoteCount: post.data.upVoteCount,
    downVoteCount: post.data.downVoteCount,
    commentCount: post.data.commentCount,
  };
}

export async function addPost(
  server: AxiosInstance,
  data:
    | {
        employeeId: number;
        title: string;
        tags?: string;
        description?: string;
      }
    | { image: any; data: string }
): Promise<AxiosResponse> {
  return server.post("/posts", data);
}

export async function updatePost(
  server: AxiosInstance,
  id: number,
  data:
    | {
        title?: string;
        tags?: string;
        description?: string;
      }
    | { image: any; data: string }
): Promise<AxiosResponse> {
  return server.patch(`/posts/${id}`, data);
}

export async function deletePost(server: AxiosInstance, id: number) {
  return server.delete(`/posts/${id}`);
}
