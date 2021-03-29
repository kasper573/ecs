import { get, set, values } from "../../ecs-common/nominal";
import {
  SceneDefinition,
  SceneDefinitionId,
} from "../../ecs-serializable/types/SceneDefinition";
import { createEditorStateReducer } from "../functions/createEditorStateReducer";
import { uuid } from "../../ecs-common/uuid";
import { EntityInitializer } from "../../ecs-serializable/types/EntityInitializer";

export const duplicateSceneDefinition = createEditorStateReducer<SceneDefinitionId>(
  ({ ecs: { scenes, entityInitializers } }, { payload: id }) => {
    const scene = get(scenes, id);
    if (!scene) {
      throw new Error("Could not find scene to duplicate");
    }

    // Duplicate scene
    const duplicateScene: SceneDefinition = {
      ...scene,
      id: uuid(),
      name: scene.name + " Copy",
    };
    set(scenes, duplicateScene.id, duplicateScene);

    // Duplicate entities into new scene
    for (const entity of values(entityInitializers).filter(
      (def) => def.sceneId === id
    )) {
      const duplicateEntity: EntityInitializer = {
        ...entity,
        sceneId: duplicateScene.id,
        id: uuid(),
      };
      set(entityInitializers, duplicateEntity.id, duplicateEntity);
    }
  }
);
