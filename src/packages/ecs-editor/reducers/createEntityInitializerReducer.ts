import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../selectors/selectEditorObjects";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { updateSceneReducer } from "./updateSceneReducer";

export const createEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) => {
  const { scene } = selectEditorObjects(state);
  if (scene) {
    return updateSceneReducer(state, {
      scene,
      update: {
        entities: [...scene.entities, entityInitializer],
      },
    });
  }
  return state;
};
