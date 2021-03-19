import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { updateSceneReducer } from "./updateSceneReducer";

export const createEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) => {
  const scene = selectSelectedScene(state);
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
