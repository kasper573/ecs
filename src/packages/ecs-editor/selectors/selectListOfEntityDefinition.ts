import { values } from "../../ecs-common/nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";
import { SystemDefinitionId } from "../../ecs-serializable/types/SystemDefinition";

const selectParams = (
  state: EditorState,
  forSystemId: SystemDefinitionId | undefined = state.selection.system
) => [state.ecs.entityDefinitions, forSystemId] as const;

export const selectListOfEntityDefinition = createShallowSelector(
  selectParams,
  ([entityDefinitions, forSystemId]) =>
    values(entityDefinitions).filter(
      (entity) => entity.systemId === forSystemId
    )
);
