import { LibraryNode } from "../../ecs-serializable/definition/LibraryNode";
import { EntityInitializer } from "../../ecs-serializable/definition/EntityInitializer";

/**
 * An EditorSelection value that represents what should be displayed in the inspector panel
 */
export type InspectedValue =
  | InspectedLibraryNodeId
  | InspectedEntityInitializerId;

type InspectedLibraryNodeId = {
  type: "libraryNode";
  id: LibraryNode["nodeId"];
};

type InspectedEntityInitializerId = {
  type: "entityInitializer";
  id: EntityInitializer["id"];
};
