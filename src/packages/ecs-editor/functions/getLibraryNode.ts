import {
  LibraryNode,
  LibraryNodeId,
} from "../../ecs-serializable/types/LibraryNode";
import { values } from "../../ecs-common/nominal";
import { ECSDefinition } from "../../ecs-serializable/types/ECSDefinition";

type LibraryRecords = Pick<
  ECSDefinition,
  "entityDefinitions" | "componentDefinitions" | "libraryFolders"
>;

export const getLibraryNode = (records: LibraryRecords, id: LibraryNodeId) => {
  const isNode = (node: LibraryNode) => node.nodeId === id;
  const entity = values(records.entityDefinitions).find(isNode);
  if (entity) {
    return { object: entity, type: "entity" as const, ...entity };
  }

  const component = values(records.componentDefinitions).find(isNode);
  if (component) {
    return { object: component, type: "component" as const, ...component };
  }

  const folder = values(records.libraryFolders).find(isNode);
  if (folder) {
    return { object: folder, type: "folder" as const, ...folder };
  }
};
