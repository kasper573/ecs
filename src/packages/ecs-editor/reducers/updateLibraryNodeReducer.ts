import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../selectors/selectEditorObjects";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateLibraryNodeReducer: EditorStateReducer<{
  target: LibraryNode;
  replacement: LibraryNode;
}> = (state, { target, replacement }) =>
  updateLibraryReducer(state, {
    system: selectEditorObjects(state).system,
    change: (library) => [...without(library, target), replacement],
  });
