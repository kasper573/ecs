import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const deleteLibraryNodeReducer: EditorStateReducer<{
  system?: SystemDefinition;
  node: LibraryNode;
}> = (state, { system, node }) => {
  const deletedState = updateLibraryReducer(state, {
    system,
    change: (library) => without(library, node),
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "inspected",
    didDelete: (selected) => selected?.object === node,
  });
};
