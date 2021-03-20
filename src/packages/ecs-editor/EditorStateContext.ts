import { createContext } from "react";
import { NativeComponents } from "../ecs-serializable/types/NativeComponents";
import { ComponentDefinition } from "../ecs-serializable/types/ComponentDefinition";
import { EntityDefinition } from "../ecs-serializable/types/EntityDefinition";

export const EditorStateContext = createContext<{
  nativeComponents: NativeComponents;
  libraryDefinitions: {
    components: ComponentDefinition[];
    entities: EntityDefinition[];
  };
}>({
  nativeComponents: {},
  libraryDefinitions: { components: [], entities: [] },
});
