import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectLibraryNodeReducer: EditorStateReducer<LibraryNodeId> = (
  state,
  { payload: nodeId }
) =>
  selectObjectReducer(state, {
    objectName: "inspected",
    selectedValue: { type: "libraryNode", id: nodeId },
  });
