import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";

/**
 * The object that InspectedValue resolves into.
 */
export type InspectedObject = InspectedEntityInitializer | InspectedLibraryNode;

type InspectedLibraryNode = {
  type: "libraryNode";
  object: LibraryNode;
};

type InspectedEntityInitializer = {
  type: "entityInitializer";
  object: EntityInitializer;
};
