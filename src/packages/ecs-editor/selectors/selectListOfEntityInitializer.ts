import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfEntityInitializer = (state: EditorState) =>
  values(state.ecs.entities).filter(
    (entity) => entity.sceneId === state.selection.scene
  );
