import { EditorStateReducer } from "../types/EditorStateReducer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { selectSelectedSystem } from "../selectors/selectSelectedSystem";
import { updateLibraryReducer } from "./updateLibraryReducer";

export const createLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  state,
  newNode
) =>
  updateLibraryReducer(state, {
    system: selectSelectedSystem(state),
    change: (library) => [...library, newNode],
  });
