import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { setSelectedObject } from "./setSelectedObject";

export const selectLibraryNode = createEditorStateReducer<LibraryNodeId>(
  (state, { payload: nodeId }) =>
    setSelectedObject(state, {
      objectName: "inspected",
      selectedValue: { type: "libraryNode", id: nodeId },
    })
);
