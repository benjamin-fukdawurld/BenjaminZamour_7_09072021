import { AxiosResponse } from "axios";

export interface AuthData {
  authenticated: boolean;
  userId?: number;
  token?: string;
  login?: string;
  privilege?: number;
}
