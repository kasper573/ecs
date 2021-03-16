import { createComponentDefinitions } from "../../ecs-serializable/factories/createComponentDefinitions";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { NativeComponents } from "../../ecs-serializable/types/NativeComponents";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";

export const ensureNativeComponentsReducer: EditorStateReducer<NativeComponents> = (
  state,
  nativeComponents
) => {
  const nativeNodes = createComponentDefinitions(nativeComponents).map(
    (definition): LibraryNode => ({
      id: (definition.id as string) as LibraryNodeId,
      type: "component",
      component: definition,
    })
  );
  let didUpdate = false;
  const newSystems = state.systems.map((system) => {
    const newSystem = ensureNodesInSystemLibrary(system, nativeNodes);
    if (newSystem !== system) {
      didUpdate = true;
    }
    return newSystem;
  });
  if (!didUpdate) {
    return state;
  }
  return {
    ...state,
    systems: newSystems,
  };
};

const ensureNodesInSystemLibrary = (
  system: SystemDefinition,
  requiredNodes: LibraryNode[]
): SystemDefinition => {
  const newLibrary = [...system.library];
  let didUpdate = false;
  for (const requiredNode of requiredNodes) {
    const hasNode = !!newLibrary.find((node) => node.id === requiredNode.id);
    if (!hasNode) {
      newLibrary.push(requiredNode);
      didUpdate = true;
    }
  }
  if (!didUpdate) {
    return system;
  }
  return {
    ...system,
    library: newLibrary,
  };
};
