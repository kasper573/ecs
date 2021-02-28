import { EditorObjects } from "../types/EditorObjects";
import { SystemDefinition } from "../../ecs-serializable/types/SystemDefinition";
import { EditorState } from "../types/EditorState";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectEditorObjects = ({
  systems,
  selection,
}: EditorState): Partial<EditorObjects> => {
  const system = systems[selection.system] as SystemDefinition | undefined;
  const scene = system?.scenes[selection.scene];
  const instance = scene?.entities[selection.entityInitializer];
  const entity = system?.library.entities[selection.entityDefinition];
  const component = system?.library.components[selection.componentDefinition];
  return {
    system,
    scene,
    entityInitializer: instance,
    entityDefinition: entity,
    componentDefinition: component,
  };
};
