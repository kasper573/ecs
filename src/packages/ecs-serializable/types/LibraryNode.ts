import { EntityDefinition } from "./EntityDefinition";
import { ComponentDefinition } from "./ComponentDefinition";
import { SystemDefinitionId } from "./SystemDefinition";

export type LibraryNodeId = Nominal<string, "LibraryNodeId">;

export type LibraryNode =
  | LibraryFolderNode
  | LibraryEntityNode
  | LibraryComponentNode;

export type LibraryFolderNode = LibraryNodeBase<"folder", { name: string }>;

export type LibraryEntityNode = LibraryNodeBase<
  "entity",
  { entity: EntityDefinition }
>;

export type LibraryComponentNode = LibraryNodeBase<
  "component",
  { component: ComponentDefinition }
>;

export type LibraryNodeBase<Type, Props> = {
  systemId: SystemDefinitionId;
  parentId?: LibraryNodeId;
  id: LibraryNodeId;
  type: Type;
} & Props;
