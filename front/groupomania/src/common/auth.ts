import { AuthData } from "../interfaces/AuthData";

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
