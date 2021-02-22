import { EditorState } from "../EditorState";
import { selectEditorObjects } from "../selectEditorObjects";
import { SerializableProperty } from "../persisted/SerializableProperty";
import { updateComponent } from "./updateComponent";

/**
 * Update the specified property with a partial update
 */
export const updateProperty = (
  state: EditorState,
  property: SerializableProperty,
  update: Partial<SerializableProperty>
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
