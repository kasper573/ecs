import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SystemDefinitionId } from "../../ecs-serializable/definition/SystemDefinition";

export const selectListOfComponentDefinition = createMemoizedSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.componentDefinitions, forSystemId] as const,
  ([componentDefinitions, forSystemId]) =>
    Object.values(componentDefinitions).filter(
      (component) => component.systemId === forSystemId
    )
);
