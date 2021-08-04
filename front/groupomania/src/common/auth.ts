import axios, { AxiosResponse } from "axios";

import { AuthData } from "../interfaces/AuthData";
import ConnectionData from "../interfaces/ConnectionData";

export function getAuthData(): AuthData | null {
  if (!("groupomania_auth" in localStorage)) {
    return null;
  } else {
    let authData = {
      authenticated: false,
      ...JSON.parse(localStorage.getItem("groupomania_auth") as string),
    };

    if (authData.userId) {
      authData.authenticated = true;
    }

    return authData;
  }
}

export function logOut() {
  localStorage.clear();
  window.location.href = "/";
}

export async function logIn(data: ConnectionData): Promise<AxiosResponse<any>> {
  return axios
    .post<ConnectionData>("http://localhost:5000/users/login", data)
    .then((res: AxiosResponse<any>) => {
      localStorage.setItem(
        "groupomania_auth",
        JSON.stringify({ userId: res.data.userId, token: res.data.token })
      );

      return res;
    });
}
