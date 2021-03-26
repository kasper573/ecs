import { values } from "../../nominal";
import { EditorState } from "../types/EditorState";

export const selectListOfEntityInitializer = (
  state: EditorState,
  forSceneId = state.selection.scene
) =>
  values(state.ecs.entityInitializers).filter(
    (entity) => entity.sceneId === forSceneId
  );
