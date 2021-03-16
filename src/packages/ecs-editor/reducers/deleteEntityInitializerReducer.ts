import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { selectSelectedScene } from "../selectors/selectSelectedScene";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSceneReducer } from "./updateSceneReducer";

export const deleteEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) => {
  const scene = selectSelectedScene(state);
  if (scene) {
    const deletedState = updateSceneReducer(state, {
      scene,
      update: {
        entities: without(scene.entities, entityInitializer),
      },
    });
    return reactToDeleteReducer(deletedState, {
      previousState: state,
      objectName: "inspected",
      didDelete: (selected) => selected?.object === entityInitializer,
    });
  }
  return state;
};
