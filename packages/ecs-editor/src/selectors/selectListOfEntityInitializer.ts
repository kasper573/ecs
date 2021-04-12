import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { SystemDefinitionId } from "../../../ecs-serializable/src/definition/SystemDefinition";

export const selectListOfEntityInitializer = createMemoizedSelector(
  (
    state: EditorState,
    forSystemId: SystemDefinitionId | undefined = state.selection.system
  ) => [state.ecs.entityInitializers, forSystemId] as const,
  ([entityInitializers, forSystemId]) =>
    Object.values(entityInitializers).filter(
      (entity) => entity.systemId === forSystemId
    )
);
