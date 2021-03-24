import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { remove } from "../../nominal";

export const deleteLibraryNodeReducer: EditorStateReducer<LibraryNodeId> = (
  { ecs: { library } },
  { payload: nodeId }
) => {
  if (!remove(library, nodeId)) {
    throw new Error("Could not remove library node");
  }

  // TODO call reactToLibraryUpdateReducer
};
