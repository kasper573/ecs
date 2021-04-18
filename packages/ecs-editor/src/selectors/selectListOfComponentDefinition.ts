import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { EditorRootState } from "../store";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

export const selectListOfComponentDefinition = createMemoizedSelector(
  (
    state: EditorRootState,
    forSystemId = selectSelectedSystemDefinitionId(state)
  ) => [state.editor.present.ecs.componentDefinitions, forSystemId] as const,
  ([componentDefinitions, forSystemId]) =>
    Object.values(componentDefinitions).filter(
      (component) => component.systemId === forSystemId
    )
);
