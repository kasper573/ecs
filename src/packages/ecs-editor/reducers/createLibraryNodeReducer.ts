import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectSelectedObjects } from "../selectors/selectSelectedObjects";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  state,
  newNode
) =>
  updateLibraryReducer(state, {
    system: selectSelectedObjects(state).system,
    change: (library) => [...library, newNode],
  });
