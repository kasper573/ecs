import { set } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";

export const updateLibraryNode = createEditorStateReducer<{
  nodeId: LibraryNodeId;
  replacement: LibraryNode;
}>(({ ecs: { library } }, { payload: { nodeId, replacement } }) => {
  set(library, nodeId, replacement);

  // TODO call reactToLibraryUpdateReducer
});
