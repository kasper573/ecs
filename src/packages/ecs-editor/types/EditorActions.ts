import { EditorAction } from "./EditorAction";
import { SerializableComponent } from "./SerializableComponent";
import { SerializableEntity } from "./SerializableEntity";
import { SerializableProperty } from "./SerializableProperty";
import { SerializableScene } from "./SerializableScene";
import { SerializableSystem } from "./SerializableSystem";

export type ComponentCreateAction = EditorAction<
  "CREATE_COMPONENT",
  { name: string }
>;

export type ComponentDeleteAction = EditorAction<
  "DELETE_COMPONENT",
  { component: SerializableComponent }
>;

export type ComponentRenameAction = EditorAction<
  "RENAME_COMPONENT",
  { component: SerializableComponent; name: string }
>;

export type ComponentSelectAction = EditorAction<
  "SELECT_COMPONENT",
  { component: SerializableComponent }
>;

export type EntityCreateAction = EditorAction<
  "CREATE_ENTITY",
  { name: string }
>;

export type EntityDeleteAction = EditorAction<
  "DELETE_ENTITY",
  { entity: SerializableEntity }
>;

export type EntityRenameAction = EditorAction<
  "RENAME_ENTITY",
  { entity: SerializableEntity; name: string }
>;

export type EntitySelectAction = EditorAction<
  "SELECT_ENTITY",
  { entity: SerializableEntity }
>;

export type PropertyCreateAction = EditorAction<
  "CREATE_PROPERTY",
  { name: string }
>;

export type PropertyDeleteAction = EditorAction<
  "DELETE_PROPERTY",
  { property: SerializableProperty }
>;

export type PropertyRenameAction = EditorAction<
  "RENAME_PROPERTY",
  { property: SerializableProperty; name: string }
>;

export type PropertySelectAction = EditorAction<
  "SELECT_PROPERTY",
  { property: SerializableProperty }
>;

export type SceneCreateAction = EditorAction<"CREATE_SCENE", { name: string }>;

export type SceneDeleteAction = EditorAction<
  "DELETE_SCENE",
  { scene: SerializableScene }
>;

export type SceneRenameAction = EditorAction<
  "RENAME_SCENE",
  { scene: SerializableScene; name: string }
>;

export type SceneSelectAction = EditorAction<
  "SELECT_SCENE",
  { scene: SerializableScene }
>;

export type SystemCreateAction = EditorAction<
  "CREATE_SYSTEM",
  { name: string }
>;

export type SystemDeleteAction = EditorAction<
  "DELETE_SYSTEM",
  { system: SerializableSystem }
>;

export type SystemRenameAction = EditorAction<
  "RENAME_SYSTEM",
  { system: SerializableSystem; name: string }
>;

export type SystemSelectAction = EditorAction<
  "SELECT_SYSTEM",
  { system: SerializableSystem }
>;

export type EditorActions =
  | SystemCreateAction
  | SystemRenameAction
  | SystemDeleteAction
  | SystemSelectAction
  | SceneCreateAction
  | SceneRenameAction
  | SceneDeleteAction
  | SceneSelectAction
  | EntityCreateAction
  | EntityRenameAction
  | EntityDeleteAction
  | EntitySelectAction
  | ComponentCreateAction
  | ComponentRenameAction
  | ComponentDeleteAction
  | ComponentSelectAction
  | PropertyCreateAction
  | PropertyRenameAction
  | PropertyDeleteAction
  | PropertySelectAction;
