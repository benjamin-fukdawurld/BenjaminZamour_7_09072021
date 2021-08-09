import { AxiosInstance } from "axios";
import { Theme } from "@material-ui/core/styles/createTheme";

import { theme } from "./Theme";

import AuthData from "./interfaces/AuthData";
import User from "./interfaces/User";

import createServer from "./server/server";

import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "./server/PostService";

import {
  getUsers,
  getUser,
  getUserProfile,
  updateUser,
  signUp,
  logIn,
  deleteUser,
} from "./server/UserService";

import {
  getVotes,
  getVote,
  addVote,
  updateVote,
  deleteVote,
} from "./server/VoteService";
import Vote from "./interfaces/Vote";

export default class ContextManager {
  server: AxiosInstance;
  theme: Theme;
  user: User | null;
  updater?: () => void;

  constructor(updater?: () => void) {
    const authData = this.authData;
    this.server = createServer(authData?.token);
    this.theme = theme;
    this.user = null;
    if (authData?.authenticated) {
      this.userService
        .getProfile(authData.userId as number)
        .then((user: User) => {
          this.user = user;
          if (this.updater) {
            this.updater();
          }
        })
        .catch((err: any) => {
          throw err;
        });
    }

    this.updater = updater;
  }

  async refreshUser() {
    const authData = this.authData;
    if (authData?.authenticated) {
      this.user = await this.userService.getProfile(authData.userId as number);
      if (this.updater) {
        this.updater();
      }
    }
  }

  get authData(): AuthData | null {
    if (!("groupomania_auth" in localStorage)) {
      return null;
    }

    let authData = {
      authenticated: false,
      ...JSON.parse(localStorage.getItem("groupomania_auth") as string),
    };

    if (authData.userId) {
      authData.authenticated = true;
    }

    return authData;
  }

  get isLogged(): boolean {
    if (!("groupomania_auth" in localStorage)) {
      return false;
    }

    const authData = this.authData;
    return !!authData && !!authData.authenticated;
  }

  get postService() {
    return {
      getAll: async () => getPosts(this.server),
      getOne: async (id: number) => getPost(this.server, id),
      add: async (
        data:
          | {
              employeeId: number;
              title: string;
              tags?: string;
              description?: string;
            }
          | { image: any; data: string }
      ) => addPost(this.server, data),
      update: async (
        id: number,
        data:
          | {
              title?: string;
              tags?: string;
              description?: string;
            }
          | { image: any; data: string }
      ) => updatePost(this.server, id, data),
      del: async (id: number) => deletePost(this.server, id),
    };
  }

  get userService() {
    return {
      getAll: async () => getUsers(this.server),
      getOne: async (id: number) => getUser(this.server, id),
      getProfile: async (id: number) => getUserProfile(this.server, id),

      update: async (
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
      ) => updateUser(this.server, id, data),

      del: async (id: number) => deleteUser(this.server, id),

      signUp: async (data: {
        login: string;
        email: string;
        password: string;
      }) => signUp(this.server, data),

      logIn: async (data: {
        login?: string;
        email?: string;
        password: string;
      }) => {
        const res = await logIn(this.server, data);
        localStorage.setItem(
          "groupomania_auth",
          JSON.stringify({
            userId: res.userId,
            token: res.token,
            login: res.login,
            privilege: res.privilege,
            avatarUrl: res.avatarUrl,
          })
        );

        this.server = createServer(res.token);
        this.user = await this.userService.getProfile(res.userId);
      },

      logOut: () => {
        localStorage.removeItem("groupomania_auth");
        this.user = null;
      },
    };
  }

  get voteService() {
    return {
      getAll: async (data: {
        postId?: number | null;
        commentId?: number | null;
      }) => getVotes(this.server, data),
      getOne: async (data: {
        employeeId: number;
        postId?: number | null;
        commentId?: number | null;
      }) => getVote(this.server, data),
      add: async (data: Vote) => addVote(this.server, data),
      update: async (data: Vote) => updateVote(this.server, data),
      del: async (data: {
        employeeId: number;
        postId?: number | null;
        commentId?: number | null;
      }) => deleteVote(this.server, data),
    };
  }
}
