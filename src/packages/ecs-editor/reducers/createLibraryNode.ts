import { EditorStateReducer } from "../types/EditorStateReducer";
import { set } from "../../nominal";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

export const createLibraryNode: EditorStateReducer<LibraryNode> = (
  { ecs: { library } },
  { payload: node }
) => {
  set(library, node.id, node);
};
