import { AxiosInstance } from "axios";
import Authdata from "./AuthData";

export default interface Context {
  authData: Authdata | null;
  server: AxiosInstance;
  theme: any;
}
