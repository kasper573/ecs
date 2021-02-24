import { EditorObjectAction } from "./EditorObjectAction";
import { EditorObjectName, EditorObjects } from "./EditorObjects";

// Conventions for common object operations

export type EditorObjectCreateAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"create", ObjectName, { name: string }>;

export type EditorObjectDeleteAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"delete", ObjectName, EditorObjectPayload<ObjectName>>;

export type EditorObjectRenameAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<
  "rename",
  ObjectName,
  EditorObjectPayload<ObjectName> & { name: string }
>;

export type EditorObjectSelectAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"select", ObjectName, EditorObjectPayload<ObjectName>>;

export type EditorObjectPayload<ObjectName extends EditorObjectName> = Record<
  ObjectName,
  Exclude<EditorObjects[ObjectName], undefined>
>;

// All editor actions

export type EditorActions =
  | EditorObjectCreateAction<"system">
  | EditorObjectCreateAction<"scene">
  | EditorObjectCreateAction<"entity">
  | EditorObjectCreateAction<"component">
  | EditorObjectCreateAction<"property">
  | EditorObjectRenameAction<"system">
  | EditorObjectRenameAction<"scene">
  | EditorObjectRenameAction<"entity">
  | EditorObjectRenameAction<"component">
  | EditorObjectRenameAction<"property">
  | EditorObjectDeleteAction<"system">
  | EditorObjectDeleteAction<"scene">
  | EditorObjectDeleteAction<"entity">
  | EditorObjectDeleteAction<"component">
  | EditorObjectDeleteAction<"property">
  | EditorObjectSelectAction<"system">
  | EditorObjectSelectAction<"scene">
  | EditorObjectSelectAction<"entity">
  | EditorObjectSelectAction<"component">
  | EditorObjectSelectAction<"property">;
