import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfEntityDefinition = (
  state: EditorState,
  forSystemId = state.selection.system
) =>
  values(state.ecs.entityDefinitions).filter(
    (entity) => entity.systemId === forSystemId
  );
