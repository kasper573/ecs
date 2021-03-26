import { EditorState } from "../types/EditorState";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { values } from "../../nominal";

export const selectLibraryNode = (
  {
    ecs: { entityDefinitions, componentDefinitions, libraryFolders },
  }: EditorState,
  nodeId: LibraryNodeId
) => {
  const isNode = (node: LibraryNode) => node.nodeId === nodeId;
  const entity = values(entityDefinitions).find(isNode);
  if (entity) {
    return { ...entity, type: "entity" as const };
  }

  const component = values(componentDefinitions).find(isNode);
  if (component) {
    return { ...component, type: "component" as const };
  }

  const folder = values(libraryFolders).find(isNode);
  if (folder) {
    return { ...folder, type: "folder" as const };
  }
};
