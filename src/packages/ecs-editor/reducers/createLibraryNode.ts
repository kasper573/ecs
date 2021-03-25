import { set } from "../../nominal";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";

export const createLibraryNode = createEditorStateReducer<LibraryNode>(
  ({ ecs: { library } }, { payload: node }) => {
    set(library, node.id, node);
  }
);
