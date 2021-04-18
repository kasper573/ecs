import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../../ecs-serializable/src/definition/LibraryNode";

export const setSelectedLibraryNode = createEditorStateReducer<LibraryNodeId>(
  (state, { payload: nodeId }) => {
    state.inspected = { type: "libraryNode", id: nodeId };
  }
);
