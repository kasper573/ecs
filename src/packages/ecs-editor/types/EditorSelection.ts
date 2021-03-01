import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { ComponentInitializer } from "../../ecs-serializable/types/ComponentInitializer";
import { ComponentDefinition } from "../../ecs-serializable/types/ComponentDefinition";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { EditorObjects } from "./EditorObjects";

/**
 * Selection identifiers of all editor objects.
 * Each object has its own selection identifier (ie. some use the object name, while some use an id)
 */
export type EditorSelection = Partial<{
  system: SystemDefinition[EditorSelectionProperties["system"]];
  scene: SceneDefinition[EditorSelectionProperties["scene"]];
  entityInitializer: EntityInitializer[EditorSelectionProperties["entityInitializer"]];
  entityDefinition: EntityDefinition[EditorSelectionProperties["entityDefinition"]];
  componentInitializer: ComponentInitializer[EditorSelectionProperties["componentInitializer"]];
  componentDefinition: ComponentDefinition[EditorSelectionProperties["componentDefinition"]];
}>;

type EditorSelectionProperties = typeof editorSelectionProperties;

const editorSelectionProperties = {
  system: "name" as const,
  scene: "name" as const,
  entityInitializer: "id" as const,
  entityDefinition: "id" as const,
  componentInitializer: "id" as const,
  componentDefinition: "id" as const,
};

/**
 * Gets the property name that represents the identifier
 * used for selection for the specified object
 */
export const getEditorSelectionProperty = <
  ObjectName extends keyof typeof editorSelectionProperties
>(
  objectName: ObjectName
) =>
  (editorSelectionProperties[
    objectName
  ] as unknown) as keyof EditorObjects[ObjectName];
