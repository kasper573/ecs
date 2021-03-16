import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";

/**
 * The selection object that InspectedObjectId resolves into.
 */
export type InspectedSelectionObject =
  | InspectedEntityInitializer
  | InspectedLibraryNode;

type InspectedLibraryNode = {
  type: "libraryNode";
  object: LibraryNode;
};

type InspectedEntityInitializer = {
  type: "entityInitializer";
  object: EntityInitializer;
};
