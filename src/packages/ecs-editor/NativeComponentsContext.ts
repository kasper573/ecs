import { createContext } from "react";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";

export const NativeComponentsContext = createContext<NativeComponents>({});
