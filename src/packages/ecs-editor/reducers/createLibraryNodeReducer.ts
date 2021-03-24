import { EditorStateReducer } from "../types/EditorStateReducer";
import { set } from "../../nominal";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

export const createLibraryNodeReducer: EditorStateReducer<LibraryNode> = (
  { ecs: { library } },
  { payload: node }
) => {
  set(library, node.id, node);
};
