import { EditorState } from "../types/EditorState";
import { InspectedObject, InspectedObjectId } from "../types/EditorSelection";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { SceneDefinition } from "../../ecs-serializable/types/SceneDefinition";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectSelectedObjects = ({ systems, selection }: EditorState) => {
  // Resolve EditorSelectionValues into EditorSelectionObjects
  const system = findBy(systems, "id", selection.system);
  const scene = findBy(system?.scenes, "id", selection.scene);
  const inspected = inspect(selection.inspected, system, scene);
  // Unpack InspectedObject into named properties for convenience
  const libraryNode =
    inspected?.type === "libraryNode" ? inspected.object : undefined;
  const entityInitializer =
    inspected?.type === "entityInitializer" ? inspected.object : undefined;
  return {
    system,
    scene,
    inspected,
    libraryNode,
    entityInitializer,
  };
};

const inspect = (
  inspection?: InspectedObjectId,
  system?: SystemDefinition,
  scene?: SceneDefinition
): InspectedObject | undefined => {
  if (inspection?.type === "entityInitializer") {
    const object = findBy(scene?.entities, "id", inspection.id);
    if (object) {
      return { type: "entityInitializer", object };
    }
  }
  if (inspection?.type === "libraryNode") {
    const object = findBy(system?.library, "id", inspection.id);
    if (object) {
      return { type: "libraryNode", object };
    }
  }
};

const findBy = <T, P extends keyof T>(
  list: T[] | undefined,
  property: P,
  value?: T[P]
) => {
  if (list === undefined || value === undefined) {
    return undefined;
  }
  return list.find((item) => item[property] === value);
};
