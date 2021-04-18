import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { EditorRootState } from "../store";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

export const selectListOfEntityInitializer = createMemoizedSelector(
  (
    state: EditorRootState,
    forSystemId = selectSelectedSystemDefinitionId(state)
  ) => [state.editor.present.ecs.entityInitializers, forSystemId] as const,
  ([entityInitializers, forSystemId]) =>
    Object.values(entityInitializers).filter(
      (entity) => entity.systemId === forSystemId
    )
);
