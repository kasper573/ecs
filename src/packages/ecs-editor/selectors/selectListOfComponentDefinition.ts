import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

export const selectListOfComponentDefinition = createShallowSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.componentDefinitions, forSystemId] as const,
  ([componentDefinitions, forSystemId]) =>
    values(componentDefinitions).filter(
      (component) => component.systemId === forSystemId
    )
);
