import { remove } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";

export const deleteLibraryNode = createEditorStateReducer<LibraryNodeId>(
  ({ ecs: { library } }, { payload: nodeId }) => {
    if (!remove(library, nodeId)) {
      throw new Error("Could not remove library node");
    }

    // TODO call reactToLibraryUpdateReducer
  }
);
