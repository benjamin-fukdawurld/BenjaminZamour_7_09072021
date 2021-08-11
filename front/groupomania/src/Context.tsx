import { createContext } from "react";

import ContextManager from "./ContextManager";

const Context = createContext<ContextManager>(new ContextManager());

export default Context;
