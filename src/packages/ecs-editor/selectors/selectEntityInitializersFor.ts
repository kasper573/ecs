import { EntityDefinition } from "../../ecs-serializable/types/EntityDefinition";
import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectEntityInitializersFor = (
  { ecs: { entityInitializers } }: EditorState,
  def: EntityDefinition
) => values(entityInitializers).filter((init) => init.definitionId === def.id);
