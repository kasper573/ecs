import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

const selectParams = (
  state: EditorState,
  forSystemId: SystemDefinitionId | undefined = state.selection.system
) => [state.ecs.entityDefinitions, forSystemId] as const;

export const selectListOfEntityDefinition = createMemoizedSelector(
  selectParams,
  ([entityDefinitions, forSystemId]) =>
    Object.values(entityDefinitions).filter(
      (entity) => entity.systemId === forSystemId
    )
);
