import { EditorSelectionObjects } from "./EditorSelectionObjects";
import { SerializableSystem } from "./persisted/SerializableSystem";
import { EditorState } from "./EditorState";

/**
 * Gets the EditorSelectionObjects for the current EditorSelection of the specified EditorState
 */
export const selectEditorObjects = ({
  systems,
  selection,
}: EditorState): EditorSelectionObjects => {
  const system = systems[selection.system] as SerializableSystem | undefined;
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
