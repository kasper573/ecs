import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { LibraryFolder } from "../../ecs-serializable/types/LibraryFolder";

export type DiscriminatedLibraryNode =
  | LibraryNodeType<EntityDefinition, "entity">
  | LibraryNodeType<ComponentDefinition, "component">
  | LibraryNodeType<LibraryFolder, "folder">;

type LibraryNodeType<T, N> = T & { type: N };
