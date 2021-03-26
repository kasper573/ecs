import { set } from "../../nominal";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { LibraryNodeId } from "../../ecs-serializable/types/LibraryNode";
import { selectLibraryNode } from "../selectors/selectLibraryNode";

export const renameLibraryNode = createEditorStateReducer<{
  nodeId: LibraryNodeId;
  name: string;
}>((state, { payload: { nodeId, name } }) => {
  const {
    ecs: { entityDefinitions, componentDefinitions, libraryFolders },
  } = state;
  const node = selectLibraryNode(state, nodeId);
  if (!node) {
    throw new Error("Could not update library node");
  }
  switch (node.type) {
    case "folder":
      set(libraryFolders, node.id, { ...node, name });
      return;
    case "component":
      set(componentDefinitions, node.id, { ...node, name });
      return;
    case "entity":
      set(entityDefinitions, node.id, { ...node, name });
      return;
  }
});
