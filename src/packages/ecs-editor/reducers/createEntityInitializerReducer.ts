import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../functions/selectEditorObjects";
import { createEntityInitializer } from "../../ecs-serializable/factories/createEntityInitializer";
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
        entities: [
          ...scene.entities,
          createEntityInitializer(entityInitializer),
        ],
      },
    });
  }
  return state;
};
