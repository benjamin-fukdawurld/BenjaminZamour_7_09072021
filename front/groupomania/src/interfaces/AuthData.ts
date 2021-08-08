import { AxiosResponse } from "axios";

export default interface AuthData {
  authenticated: boolean;
  userId?: number;
  token?: string;
  login?: string;
  privilege?: number;
  avatarUrl?: string;
}
