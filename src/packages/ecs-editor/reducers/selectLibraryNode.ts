import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { setSelectedObject } from "./setSelectedObject";

export const selectLibraryNode: EditorStateReducer<LibraryNodeId> = (
  state,
  { payload: nodeId }
) =>
  setSelectedObject(state, {
    objectName: "inspected",
    selectedValue: { type: "libraryNode", id: nodeId },
  });
