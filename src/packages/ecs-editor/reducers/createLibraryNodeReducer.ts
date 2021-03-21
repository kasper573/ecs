import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createLibraryNodeReducer: EditorStateReducer<{
  system?: SystemDefinition;
  node: LibraryNode;
}> = (state, { system = selectSelectedSystem(state), node }) => {
  if (!system) {
    console.warn(`Could not create library node: System must be specified`, {
      system,
      node,
    });
    return state;
  }
  return updateLibraryReducer(state, {
    system,
    change: (library) => [...library, node],
  });
};
