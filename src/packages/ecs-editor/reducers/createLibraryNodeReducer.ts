import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../selectors/selectEditorObjects";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  state,
  newNode
) =>
  updateLibraryReducer(state, {
    system: selectEditorObjects(state).system,
    change: (library) => [...library, newNode],
  });
