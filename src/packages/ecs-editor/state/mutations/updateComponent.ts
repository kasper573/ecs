import { EditorState } from "../EditorState";
import { selectEditorObjects } from "../selectEditorObjects";
import { SerializableComponent } from "../persisted/SerializableComponent";
import { updateEntity } from "./updateEntity";

/**
 * Update the specified component with a partial update
 */
export const updateComponent = (
  state: EditorState,
  component: SerializableComponent,
  update: Partial<SerializableComponent>
): EditorState => {
  const { entity } = selectEditorObjects(state);
  if (!entity) {
    return state;
  }

  const updatedComponents = entity.components.slice();
  const index = updatedComponents.indexOf(component);
  updatedComponents[index] = { ...component, ...update };
  return updateEntity(state, entity, {
    components: updatedComponents,
  });
};
