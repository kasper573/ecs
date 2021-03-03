import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";
import { LibraryNode } from "../../ecs-serializable/types/LibraryNode";
import { EditorObjects } from "./EditorObjects";

/**
 * Selection identifiers of all editor objects.
 * Each object has its own selection identifier (ie. some use the object name, while some use an id)
 */
export type EditorSelection = Partial<{
  system: SystemDefinition[EditorSelectionProperties["system"]];
  scene: SceneDefinition[EditorSelectionProperties["scene"]];
  entityInitializer: EntityInitializer[EditorSelectionProperties["entityInitializer"]];
  libraryNode: LibraryNode[EditorSelectionProperties["libraryNode"]];
}>;

type EditorSelectionProperties = typeof editorSelectionProperties;

const editorSelectionProperties = {
  system: "id" as const,
  scene: "id" as const,
  entityInitializer: "id" as const,
  libraryNode: "id" as const,
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
