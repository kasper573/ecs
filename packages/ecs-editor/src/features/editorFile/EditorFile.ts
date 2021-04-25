import { ComponentDefinitionId } from "../../../../ecs-serializable/src/definition/ComponentDefinition";

export type EditorFileId = ComponentDefinitionFile["definitionId"];

export type EditorFile = ComponentDefinitionFile;

export type ComponentDefinitionFile = EditorFileType<
  "componentDefinition",
  { definitionId: ComponentDefinitionId }
>;

export type EditorFileType<T, Payload> = { type: T; order: number } & Payload;
