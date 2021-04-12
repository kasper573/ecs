import { EntityInitializer } from "../../../ecs-serializable/src/definition/EntityInitializer";
import { TypedLibraryNode } from "./TypedLibraryNode";

/**
 * The object that InspectedValue resolves into.
 */
export type InspectedObject = InspectedEntityInitializer | InspectedLibraryNode;

type InspectedLibraryNode = {
  type: "libraryNode";
  object: TypedLibraryNode;
};

type InspectedEntityInitializer = {
  type: "entityInitializer";
  object: EntityInitializer;
};
