import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const updateLibraryNodeReducer: EditorStateReducer<{
  target: LibraryNode;
  replacement: LibraryNode;
}> = (state, { target, replacement }) =>
  updateLibraryReducer(state, {
    system: selectSelectedSystem(state),
    change: (library) => [...without(library, target), replacement],
  });
