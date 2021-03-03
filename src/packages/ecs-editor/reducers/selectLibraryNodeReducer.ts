import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { selectObjectReducer } from "./selectObjectReducer";

export const selectLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  state,
  node
) =>
  selectObjectReducer(state, {
    objectName: "libraryNode",
    selectedObject: node,
  });
