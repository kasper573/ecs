import { EditorState } from "../types/EditorState";
import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { values } from "../../nominal";
import { createShallowSelector } from "../functions/createShallowSelector";

const selectParams = ({ ecs }: EditorState, nodeId: LibraryNodeId) =>
  [
    ecs.entityDefinitions,
    ecs.componentDefinitions,
    ecs.libraryFolders,
    nodeId,
  ] as const;

export const selectLibraryNode = createShallowSelector(
  selectParams,
  ([entityDefinitions, componentDefinitions, libraryFolders, nodeId]) => {
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
  }
);
