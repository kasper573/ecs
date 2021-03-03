import { EntityDefinition } from "./EntityDefinition";
import { ComponentDefinition } from "./ComponentDefinition";

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
  parentId?: LibraryNodeId;
  id: LibraryNodeId;
  type: Type;
} & Props;
