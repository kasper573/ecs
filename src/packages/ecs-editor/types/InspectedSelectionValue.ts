import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";

/**
 * The selection value that represents what should be displayed in the inspector panel
 */
export type InspectedSelectionValue =
  | InspectedLibraryNodeId
  | InspectedEntityInitializerId;

type InspectedLibraryNodeId = {
  type: "libraryNode";
  id: LibraryNode["id"];
};

type InspectedEntityInitializerId = {
  type: "entityInitializer";
  id: EntityInitializer["id"];
};
