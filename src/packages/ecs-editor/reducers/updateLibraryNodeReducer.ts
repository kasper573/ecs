import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateLibraryNodeReducer: EditorStateReducer<{
  system?: SystemDefinition;
  target: LibraryNode;
  replacement: LibraryNode;
}> = (state, { system = selectSelectedSystem(state), target, replacement }) => {
  if (!system) {
    console.warn(`Could not update library node: System must be specified`, {
      system,
      target,
      replacement,
    });
    return state;
  }
  return updateLibraryReducer(state, {
    system,
    change: (library) => [...without(library, target), replacement],
  });
};
