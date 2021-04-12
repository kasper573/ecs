import { EditorState } from "../types/EditorState";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../../ecs-serializable/src/definition/LibraryNode";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";

const selectParams = ({ ecs }: EditorState, nodeId: LibraryNodeId) =>
  [
    ecs.entityDefinitions,
    ecs.componentDefinitions,
    ecs.libraryFolders,
    nodeId,
  ] as const;

export const selectLibraryNode = createMemoizedSelector(
  selectParams,
  ([entityDefinitions, componentDefinitions, libraryFolders, nodeId]) => {
    const isNode = (node: LibraryNode) => node.nodeId === nodeId;
    const entity = Object.values(entityDefinitions).find(isNode);
    if (entity) {
      return { ...entity, type: "entity" as const };
    }

    const component = Object.values(componentDefinitions).find(isNode);
    if (component) {
      return { ...component, type: "component" as const };
    }

    const folder = Object.values(libraryFolders).find(isNode);
    if (folder) {
      return { ...folder, type: "folder" as const };
    }
  }
);
