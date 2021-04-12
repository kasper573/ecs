import { createContext } from "react";
import { NativeComponents } from "../../ecs-serializable/src/types/NativeComponents";

export const NativeComponentsContext = createContext<NativeComponents>({});
