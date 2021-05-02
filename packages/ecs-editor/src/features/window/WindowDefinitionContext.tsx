import { createContext } from "react";
import { WindowDefinition } from "./WindowDefinition";

export const WindowDefinitionContext = createContext<WindowDefinition[]>([]);
