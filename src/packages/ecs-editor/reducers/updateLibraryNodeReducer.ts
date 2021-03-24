import { EditorStateReducer } from "../types/EditorStateReducer";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { set } from "../../nominal";

export const updateLibraryNodeReducer: EditorStateReducer<{
  nodeId: LibraryNodeId;
  replacement: LibraryNode;
}> = ({ ecs: { library } }, { payload: { nodeId, replacement } }) => {
  set(library, nodeId, replacement);

  // TODO call reactToLibraryUpdateReducer
};
