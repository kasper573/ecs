import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { DiscriminatedLibraryNode } from "./DiscriminatedLibraryNode";

/**
 * The object that InspectedValue resolves into.
 */
export type InspectedObject = InspectedEntityInitializer | InspectedLibraryNode;

type InspectedLibraryNode = {
  type: "libraryNode";
  object: DiscriminatedLibraryNode;
};

type InspectedEntityInitializer = {
  type: "entityInitializer";
  object: EntityInitializer;
};
