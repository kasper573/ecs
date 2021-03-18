import { createContext } from "react";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";
import { ComponentDefinition } from "../ecs-serializable/types/ComponentDefinition";

export const ComponentsContext = createContext<{
  nativeComponents: NativeComponents;
  componentDefinitions: ComponentDefinition[];
}>({ nativeComponents: {}, componentDefinitions: [] });
