import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";
import { createShallowSelector } from "../functions/createShallowSelector";

export const selectEntityInitializersFor = createShallowSelector(
  (state: EditorState, def: EntityDefinition) =>
    [state.ecs.entityInitializers, def.id] as const,
  ([entityInitializers, id]) =>
    values(entityInitializers).filter((init) => init.definitionId === id)
);
