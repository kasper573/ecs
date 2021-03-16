import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateLibraryNodeReducer: EditorStateReducer<{
  target: LibraryNode;
  replacement: LibraryNode;
}> = (state, { target, replacement }) =>
  updateLibraryReducer(state, {
    system: selectSelectedObjects(state).system,
    change: (library) => [...without(library, target), replacement],
  });
