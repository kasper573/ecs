import { EntityDefinition } from "../../../ecs-serializable/src/definition/EntityDefinition";
import { ComponentDefinition } from "../../../ecs-serializable/src/definition/ComponentDefinition";
import { LibraryFolder } from "../../../ecs-serializable/src/definition/LibraryFolder";

export type TypedLibraryNode =
  | LibraryNodeType<EntityDefinition, "entity">
  | LibraryNodeType<ComponentDefinition, "component">
  | LibraryNodeType<LibraryFolder, "folder">;

type LibraryNodeType<T, N> = T & { type: N };
