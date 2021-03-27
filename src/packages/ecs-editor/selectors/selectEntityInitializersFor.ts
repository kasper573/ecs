import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { values } from "../../ecs-common/nominal";
import { EditorState } from "../types/EditorState";
import { createMemoizedSelector } from "../functions/createMemoizedSelector";

export const selectEntityInitializersFor = createMemoizedSelector(
  (state: EditorState, def: EntityDefinition) =>
    [state.ecs.entityInitializers, def.id] as const,
  ([entityInitializers, id]) =>
    values(entityInitializers).filter((init) => init.definitionId === id)
);
