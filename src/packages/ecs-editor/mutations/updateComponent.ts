import { EditorState } from "../types/EditorState";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { SerializedComponent } from "../types/SerializedComponent";
import { updateEntity } from "./updateEntity";

/**
 * Update the specified component with a partial update
 */
export const updateComponent = (
  state: EditorState,
  component: SerializedComponent,
  update: Partial<SerializedComponent>
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
