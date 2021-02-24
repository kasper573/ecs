import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { SerializedProperty } from "../types/SerializedProperty";
import { updateComponent } from "./updateComponent";

/**
 * Update the specified property with a partial update
 */
export const updateProperty = (
  state: EditorState,
  property: SerializedProperty,
  update: Partial<SerializedProperty>
): EditorState => {
  const { component } = selectEditorObjects(state);
  if (!component) {
    return state;
  }
  const updatedProperties = component.properties.slice();
  const index = updatedProperties.indexOf(property);
  updatedProperties[index] = { ...property, ...update };
  return updateComponent(state, component, {
    properties: updatedProperties,
  });
};
