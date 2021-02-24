import { EditorObjects } from "../types/EditorObjects";
import { SerializedSystem } from "../types/SerializedSystem";
import { EditorState } from "../types/EditorState";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectEditorObjects = ({
  systems,
  selection,
}: EditorState): EditorObjects => {
  const system = systems[selection.system] as SerializedSystem | undefined;
  const scene = system?.scenes[selection.scene];
  const entity = scene?.entities[selection.entity];
  const component = entity?.components[selection.component];
  const property = component?.properties[selection.property];
  return {
    system,
    scene,
    entity,
    component,
    property,
  };
};
