import { createMemoizedSelector } from "../functions/createMemoizedSelector";
import { EditorRootState } from "../store";
import { selectSelectedSystemDefinitionId } from "./selectSelectedSystemDefinitionId";

const selectParams = (
  state: EditorRootState,
  forSystemId = selectSelectedSystemDefinitionId(state)
) => [state.editor.present.ecs.entityDefinitions, forSystemId] as const;

export const selectListOfEntityDefinition = createMemoizedSelector(
  selectParams,
  ([entityDefinitions, forSystemId]) =>
    Object.values(entityDefinitions).filter(
      (entity) => entity.systemId === forSystemId
    )
);
