import { without } from "lodash";
import { EditorStateReducer } from "../types/EditorStateReducer";
import { selectEditorObjects } from "../selectors/selectEditorObjects";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";
import { reactToDeleteReducer } from "./reactToDeleteReducer";
import { updateSceneReducer } from "./updateSceneReducer";

export const deleteEntityInitializerReducer: EditorStateReducer<EntityInitializer> = (
  state,
  entityInitializer
) => {
  const selected = selectEditorObjects(state);
  if (selected.scene) {
    const deletedState = updateSceneReducer(state, {
      scene: selected.scene,
      update: {
        entities: without(selected.scene.entities, entityInitializer),
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
