import { EditorObjectAction } from "./EditorObjectAction";
import { EditorObjectName, EditorObjects } from "./EditorObjects";
import { EditorAction } from "./EditorAction";
import { EditorState } from "./EditorState";

// Conventions for common object operations

export type EditorObjectCreateAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"create", ObjectName, EditorObjectPayload<ObjectName>>;

export type EditorObjectDeleteAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"delete", ObjectName, EditorObjectPayload<ObjectName>>;

export type EditorObjectUpdateAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<
  "update",
  ObjectName,
  EditorObjectPayload<ObjectName> & {
    update: Partial<EditorObjects[ObjectName]>;
  }
>;

export type EditorObjectSelectAction<
  ObjectName extends EditorObjectName
> = EditorObjectAction<"select", ObjectName, EditorObjectPayload<ObjectName>>;

export type EditorObjectPayload<ObjectName extends EditorObjectName> = Record<
  ObjectName,
  EditorObjects[ObjectName]
>;

export type UpdateStateAction = EditorAction<
  "UPDATE_STATE",
  { update: Partial<EditorState> }
>;

// All editor actions

export type EditorActions =
  | UpdateStateAction
  | EditorObjectCreateAction<"system">
  | EditorObjectCreateAction<"scene">
  | EditorObjectCreateAction<"entityInitializer">
  | EditorObjectCreateAction<"entityDefinition">
  | EditorObjectCreateAction<"componentInitializer">
  | EditorObjectUpdateAction<"system">
  | EditorObjectUpdateAction<"scene">
  | EditorObjectUpdateAction<"entityInitializer">
  | EditorObjectUpdateAction<"entityDefinition">
  | EditorObjectUpdateAction<"componentInitializer">
  | EditorObjectDeleteAction<"system">
  | EditorObjectDeleteAction<"scene">
  | EditorObjectDeleteAction<"entityInitializer">
  | EditorObjectDeleteAction<"entityDefinition">
  | EditorObjectDeleteAction<"componentInitializer">
  | EditorObjectSelectAction<"system">
  | EditorObjectSelectAction<"scene">
  | EditorObjectSelectAction<"entityInitializer">
  | EditorObjectSelectAction<"entityDefinition">
  | EditorObjectSelectAction<"componentInitializer">
  | EditorObjectSelectAction<"componentDefinition">;
