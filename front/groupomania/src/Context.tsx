import { createContext } from "react";

import { theme } from "./Theme";
import { getAuthData } from "./common/auth";
import createServer from "./server/server";
import ContextType from "./interfaces/Context";

const authData = getAuthData();
const context = {
  authData,
  server: createServer(authData?.token),
  theme,
};

const Context = createContext<ContextType>(context);

export { context as defaultValue };
export default Context;
