import { EntityDefinition } from "../../ecs-serializable/definition/EntityDefinition";
import { ComponentDefinition } from "../../ecs-serializable/definition/ComponentDefinition";
import { LibraryFolder } from "../../ecs-serializable/definition/LibraryFolder";

export type TypedLibraryNode =
  | LibraryNodeType<EntityDefinition, "entity">
  | LibraryNodeType<ComponentDefinition, "component">
  | LibraryNodeType<LibraryFolder, "folder">;

type LibraryNodeType<T, N> = T & { type: N };
