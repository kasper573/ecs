import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const deleteLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  state,
  targetNode
) => {
  const deletedState = updateLibraryReducer(state, {
    system: selectSelectedSystem(state),
    change: (library) => without(library, targetNode),
  });
  return reactToDeleteReducer(deletedState, {
    previousState: state,
    objectName: "inspected",
    didDelete: (selected) => selected?.object === targetNode,
  });
};
