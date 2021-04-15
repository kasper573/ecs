import { EditorRootState } from "../store";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

export const selectSelectedSystemDefinition = (state: EditorRootState) => {
  const id = selectSelectedSystemDefinitionId(state);
  const { systems } = state.editor.present.ecs;
  return id && systems.hasOwnProperty(id) ? systems[id] : undefined;
};
